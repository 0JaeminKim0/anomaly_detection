// Global data
let analysisData = null;

// DOM Elements
const startBtn = document.getElementById('startBtn');
const agentText = document.getElementById('agentText');
const statusArea = document.getElementById('statusArea');
const statusText = document.getElementById('statusText');
const landingScreen = document.getElementById('landingScreen');
const processingScreen = document.getElementById('processingScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const terminal = document.getElementById('terminal');
const progressBar = document.getElementById('progressBar');
const stepTitle = document.getElementById('stepTitle');
const stepProgress = document.getElementById('stepProgress');
const detailModal = document.getElementById('detailModal');

// Agent messages
const agentMessages = {
    start: "안녕하세요! 저는 구매 이상거래를 탐지하는 AI 에이전트 HANA입니다.",
    loading: "2023~2025년 구매실적 데이터를 불러오고 있어요. 잠시만 기다려 주세요...",
    loaded: "518개 자재, 62개 공급사 데이터를 확인했어요!",
    preprocessing: "정확한 분석을 위해 데이터를 정제하고 있어요. 발주가 없는 달(0값)은 제외하고 유효한 데이터만 사용할게요.",
    rule1: "첫 번째, 수량 변동성을 분석하고 있어요. 평균 대비 ±20% 이상 변동한 자재를 찾고 있습니다...",
    rule2: "두 번째, 단가 변동성을 확인하고 있어요. 단가가 ±10% 이상 변동한 자재는 특히 주의가 필요해요.",
    rule3: "세 번째, 계약 만료가 임박한 자재를 확인하고 있어요. 3개월 이내 재계약이 필요한 자재를 찾을게요.",
    rule4: "네 번째, 재고금액 변동을 분석하고 있어요. 구매량 변동 대비 재고가 이상하게 변동한 자재를 찾습니다.",
    rule5: "마지막으로, 발주건수 변동을 확인하고 있어요. 구매금액 대비 발주 횟수가 비정상적인 경우를 탐지해요.",
    complete: "분석이 완료되었습니다! 결과를 보여드릴게요."
};

// Typing effect
async function typeText(text, element) {
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        element.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor"></span>';
        await sleep(30);
    }
    element.innerHTML = text;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Add terminal line
function addTerminalLine(text, type = 'info') {
    const colors = {
        info: 'text-blue-400',
        success: 'text-green-400',
        warning: 'text-yellow-400',
        error: 'text-red-400'
    };
    const line = document.createElement('div');
    line.className = 'terminal-line ' + colors[type];
    line.innerHTML = '> ' + text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

// Update step icon
function updateStepIcon(step, status) {
    const icon = document.getElementById('step' + step + 'Icon');
    if (status === 'active') {
        icon.className = 'w-12 h-12 mx-auto rounded-full bg-orange-500 flex items-center justify-center mb-2 animate-pulse';
        icon.querySelector('i').className = icon.querySelector('i').className.replace('text-gray-400', 'text-white');
    } else if (status === 'complete') {
        icon.className = 'w-12 h-12 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-2';
        icon.innerHTML = '<i class="fas fa-check text-white"></i>';
    }
}

// Animate counter
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Start analysis
async function startAnalysis() {
    startBtn.disabled = true;
    startBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>분석 중...';
    statusArea.style.display = 'block';
    
    // Fetch data
    try {
        const response = await fetch('/api/data');
        analysisData = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return;
    }
    
    // Show processing screen
    landingScreen.style.display = 'none';
    processingScreen.style.display = 'block';
    
    // Step 1: Data Loading
    await typeText(agentMessages.loading, agentText);
    stepTitle.textContent = '데이터 로딩 중...';
    stepProgress.textContent = 'STEP 1/5';
    updateStepIcon(1, 'active');
    progressBar.style.width = '10%';
    addTerminalLine('데이터 로딩 시작...', 'info');
    await sleep(800);
    addTerminalLine('구매실적_데이터_23_24_25.xlsx 파일 로드 중...', 'info');
    await sleep(600);
    addTerminalLine('518개 자재 데이터 확인 ✓', 'success');
    addTerminalLine('62개 공급사 매핑 완료 ✓', 'success');
    updateStepIcon(1, 'complete');
    progressBar.style.width = '20%';
    await typeText(agentMessages.loaded, agentText);
    await sleep(500);
    
    // Step 2: Preprocessing
    stepTitle.textContent = '데이터 전처리 중...';
    stepProgress.textContent = 'STEP 2/5';
    updateStepIcon(2, 'active');
    await typeText(agentMessages.preprocessing, agentText);
    addTerminalLine('데이터 전처리 시작...', 'info');
    await sleep(500);
    addTerminalLine('0값 제외 처리 중...', 'info');
    await sleep(400);
    addTerminalLine('유효월수 계산 완료 ✓', 'success');
    addTerminalLine('자재별 집계 완료 ✓', 'success');
    updateStepIcon(2, 'complete');
    progressBar.style.width = '40%';
    await sleep(500);
    
    // Step 3: Rule Analysis
    stepTitle.textContent = 'Rule 분석 실행 중...';
    stepProgress.textContent = 'STEP 3/5';
    updateStepIcon(3, 'active');
    
    // Rule 1
    await typeText(agentMessages.rule1, agentText);
    addTerminalLine('[Rule 1] 수량 변동성 분석 중...', 'info');
    await sleep(600);
    addTerminalLine('Rule 1 탐지 완료: ' + analysisData.summary.rules[0].count + '건 (' + analysisData.summary.rules[0].percentage + '%)', 'success');
    progressBar.style.width = '50%';
    
    // Rule 2
    await typeText(agentMessages.rule2, agentText);
    addTerminalLine('[Rule 2] 단가 변동성 분석 중...', 'info');
    await sleep(600);
    addTerminalLine('Rule 2 탐지 완료: ' + analysisData.summary.rules[1].count + '건 (' + analysisData.summary.rules[1].percentage + '%)', 'success');
    progressBar.style.width = '55%';
    
    // Rule 3
    await typeText(agentMessages.rule3, agentText);
    addTerminalLine('[Rule 3] 계약 도래 분석 중...', 'info');
    await sleep(600);
    addTerminalLine('Rule 3 탐지 완료: ' + analysisData.summary.rules[2].count + '건 (' + analysisData.summary.rules[2].percentage + '%)', 'success');
    progressBar.style.width = '60%';
    
    // Rule 4
    await typeText(agentMessages.rule4, agentText);
    addTerminalLine('[Rule 4] 재고금액 괴리 분석 중...', 'info');
    await sleep(600);
    addTerminalLine('Rule 4 탐지 완료: ' + analysisData.summary.rules[3].count + '건 (' + analysisData.summary.rules[3].percentage + '%)', 'success');
    progressBar.style.width = '70%';
    
    // Rule 5
    await typeText(agentMessages.rule5, agentText);
    addTerminalLine('[Rule 5] 발주건수 괴리 분석 중...', 'info');
    await sleep(600);
    addTerminalLine('Rule 5 탐지 완료: ' + analysisData.summary.rules[4].count + '건 (' + analysisData.summary.rules[4].percentage + '%)', 'success');
    progressBar.style.width = '80%';
    updateStepIcon(3, 'complete');
    await sleep(500);
    
    // Step 4: Anomaly Detection Complete
    stepTitle.textContent = '이상 징후 집계 중...';
    stepProgress.textContent = 'STEP 4/5';
    updateStepIcon(4, 'active');
    addTerminalLine('이상 징후 집계 중...', 'info');
    await sleep(500);
    addTerminalLine('총 ' + analysisData.summary.total_anomalies + '건의 이상 징후 발견!', 'warning');
    addTerminalLine('고위험 항목: ' + analysisData.summary.high_risk_count + '건', 'error');
    updateStepIcon(4, 'complete');
    progressBar.style.width = '90%';
    await sleep(500);
    
    // Step 5: Generate Results
    stepTitle.textContent = '결과 생성 중...';
    stepProgress.textContent = 'STEP 5/5';
    updateStepIcon(5, 'active');
    addTerminalLine('대시보드 생성 중...', 'info');
    await sleep(500);
    addTerminalLine('분석 완료! ✓', 'success');
    updateStepIcon(5, 'complete');
    progressBar.style.width = '100%';
    
    await typeText(agentMessages.complete, agentText);
    statusText.textContent = '분석 완료';
    await sleep(1000);
    
    // Show dashboard
    showDashboard();
}

// Show dashboard
function showDashboard() {
    processingScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    startBtn.innerHTML = '<i class="fas fa-redo mr-2"></i>다시 분석';
    startBtn.disabled = false;
    
    // Animate KPIs
    animateCounter(document.getElementById('kpiMaterials'), analysisData.summary.total_materials);
    animateCounter(document.getElementById('kpiAnomalies'), analysisData.summary.total_anomalies);
    document.getElementById('kpiAnomaliesPercent').textContent = 
        ((analysisData.summary.total_anomalies / analysisData.summary.total_materials) * 100).toFixed(1) + '%';
    animateCounter(document.getElementById('kpiHighRisk'), analysisData.summary.high_risk_count);
    animateCounter(document.getElementById('kpiContracts'), analysisData.summary.rules[2].count);
    
    // Draw charts
    drawRuleChart();
    drawRiskChart();
    
    // Show agent insight
    showAgentInsight();
    
    // Show default tab
    showTabContent('rule1');
}

// Draw rule chart
function drawRuleChart() {
    const ctx = document.getElementById('ruleChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: analysisData.summary.rules.map(r => r.name),
            datasets: [{
                label: '탐지 건수',
                data: analysisData.summary.rules.map(r => r.count),
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Draw risk chart
function drawRiskChart() {
    let high = 0, medium = 0, low = 0;
    Object.values(analysisData.details).forEach(ruleData => {
        ruleData.forEach(item => {
            if (item.risk_level === 'high') high++;
            else if (item.risk_level === 'medium') medium++;
            else low++;
        });
    });
    
    const ctx = document.getElementById('riskChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['고위험', '주의', '관심'],
            datasets: [{
                data: [high, medium, low],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(234, 179, 8, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Show agent insight
function showAgentInsight() {
    const insight = document.getElementById('agentInsight');
    const totalAnomalies = analysisData.summary.total_anomalies;
    const rule2Top = analysisData.details.rule2[0];
    
    const highRiskRule2 = analysisData.details.rule2.filter(r => r.risk_level === 'high').length;
    const highGapRule4 = analysisData.details.rule4.filter(r => Math.abs(r.gap_rate) > 50).length;
    const urgentRule3 = analysisData.details.rule3.filter(r => r.months_remaining <= 1).length;
    
    let insightHtml = '<p>분석 결과, 총 <strong class="text-orange-600">' + totalAnomalies + '건</strong>의 이상 징후가 발견되었습니다.</p>';
    insightHtml += '<div class="mt-3 space-y-2">';
    insightHtml += '<p>🔴 <strong>즉시 확인 필요:</strong> 단가가 30% 이상 급락한 자재 ' + highRiskRule2 + '건</p>';
    insightHtml += '<p>🟠 <strong>주의 필요:</strong> 구매량 대비 재고 괴리가 큰 자재 ' + highGapRule4 + '건</p>';
    insightHtml += '<p>🟡 <strong>모니터링:</strong> 계약 만료 1개월 내 자재 ' + urgentRule3 + '건</p>';
    insightHtml += '</div>';
    
    if (rule2Top) {
        insightHtml += '<p class="mt-4 text-sm bg-red-50 p-3 rounded-lg border border-red-200">';
        insightHtml += '👉 가장 우선적으로 \'<strong>' + rule2Top.name + '</strong>\' 자재를 확인해 보시기 바랍니다. (단가 ' + rule2Top.change_rate + '% 변동)';
        insightHtml += '</p>';
    }
    
    insight.innerHTML = insightHtml;
}

// Show tab content
function showTabContent(tab) {
    const content = document.getElementById('tabContent');
    const data = analysisData.details[tab];
    const ruleIndex = parseInt(tab.replace('rule', '')) - 1;
    const rule = analysisData.summary.rules[ruleIndex];
    
    let headers = '';
    let rows = '';
    
    if (tab === 'rule1') {
        headers = '<th class="px-4 py-3 text-left">자재코드</th><th class="px-4 py-3 text-left">자재명</th><th class="px-4 py-3 text-left">공급업체</th><th class="px-4 py-3 text-right">유효월수</th><th class="px-4 py-3 text-right">평균수량</th><th class="px-4 py-3 text-right">25년12월</th><th class="px-4 py-3 text-right">변동률</th><th class="px-4 py-3 text-center">위험도</th>';
        rows = data.slice(0, 15).map(function(item) {
            return '<tr class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onclick="showDetail(\'' + item.code + '\', \'rule1\')">' +
                '<td class="px-4 py-3 font-mono text-sm">' + item.code + '</td>' +
                '<td class="px-4 py-3">' + item.name.substring(0, 25) + (item.name.length > 25 ? '...' : '') + '</td>' +
                '<td class="px-4 py-3 text-sm text-gray-600">' + (item.suppliers[0] || '-') + '</td>' +
                '<td class="px-4 py-3 text-right">' + item.valid_months + '</td>' +
                '<td class="px-4 py-3 text-right">' + Number(item.avg_value).toLocaleString() + '</td>' +
                '<td class="px-4 py-3 text-right">' + Number(item.current_value).toLocaleString() + '</td>' +
                '<td class="px-4 py-3 text-right font-semibold ' + (item.change_rate > 0 ? 'text-green-600' : 'text-red-600') + '">' + (item.change_rate > 0 ? '+' : '') + item.change_rate + '%</td>' +
                '<td class="px-4 py-3 text-center">' + getRiskBadge(item.risk_level) + '</td>' +
                '</tr>';
        }).join('');
    } else if (tab === 'rule2') {
        headers = '<th class="px-4 py-3 text-left">자재코드</th><th class="px-4 py-3 text-left">자재명</th><th class="px-4 py-3 text-left">공급업체</th><th class="px-4 py-3 text-right">평균단가</th><th class="px-4 py-3 text-right">25년12월</th><th class="px-4 py-3 text-right">변동률</th><th class="px-4 py-3 text-center">위험도</th>';
        rows = data.map(function(item) {
            return '<tr class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onclick="showDetail(\'' + item.code + '\', \'rule2\')">' +
                '<td class="px-4 py-3 font-mono text-sm">' + item.code + '</td>' +
                '<td class="px-4 py-3">' + item.name.substring(0, 25) + (item.name.length > 25 ? '...' : '') + '</td>' +
                '<td class="px-4 py-3 text-sm text-gray-600">' + (item.suppliers[0] || '-') + '</td>' +
                '<td class="px-4 py-3 text-right">' + Number(item.avg_value).toLocaleString() + '</td>' +
                '<td class="px-4 py-3 text-right">' + Number(item.current_value).toLocaleString() + '</td>' +
                '<td class="px-4 py-3 text-right font-semibold ' + (item.change_rate > 0 ? 'text-green-600' : 'text-red-600') + '">' + (item.change_rate > 0 ? '+' : '') + item.change_rate + '%</td>' +
                '<td class="px-4 py-3 text-center">' + getRiskBadge(item.risk_level) + '</td>' +
                '</tr>';
        }).join('');
    } else if (tab === 'rule3') {
        headers = '<th class="px-4 py-3 text-left">자재코드</th><th class="px-4 py-3 text-left">자재명</th><th class="px-4 py-3 text-left">공급업체</th><th class="px-4 py-3 text-center">재계약시점</th><th class="px-4 py-3 text-center">잔여개월</th><th class="px-4 py-3 text-center">위험도</th>';
        rows = data.slice(0, 15).map(function(item) {
            return '<tr class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onclick="showDetail(\'' + item.code + '\', \'rule3\')">' +
                '<td class="px-4 py-3 font-mono text-sm">' + item.code + '</td>' +
                '<td class="px-4 py-3">' + item.name.substring(0, 25) + (item.name.length > 25 ? '...' : '') + '</td>' +
                '<td class="px-4 py-3 text-sm text-gray-600">' + (item.suppliers[0] || '-') + '</td>' +
                '<td class="px-4 py-3 text-center">' + item.contract_date + '</td>' +
                '<td class="px-4 py-3 text-center font-semibold">' + item.months_remaining + '개월</td>' +
                '<td class="px-4 py-3 text-center">' + getRiskBadge(item.risk_level) + '</td>' +
                '</tr>';
        }).join('');
    } else if (tab === 'rule4') {
        headers = '<th class="px-4 py-3 text-left">자재코드</th><th class="px-4 py-3 text-left">자재명</th><th class="px-4 py-3 text-right">구매금액 증감</th><th class="px-4 py-3 text-right">재고금액 증감</th><th class="px-4 py-3 text-right">괴리율</th><th class="px-4 py-3 text-center">위험도</th>';
        rows = data.slice(0, 15).map(function(item) {
            return '<tr class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onclick="showDetail(\'' + item.code + '\', \'rule4\')">' +
                '<td class="px-4 py-3 font-mono text-sm">' + item.code + '</td>' +
                '<td class="px-4 py-3">' + item.name.substring(0, 25) + (item.name.length > 25 ? '...' : '') + '</td>' +
                '<td class="px-4 py-3 text-right ' + (item.amount_change > 0 ? 'text-green-600' : 'text-red-600') + '">' + (item.amount_change > 0 ? '+' : '') + item.amount_change + '%</td>' +
                '<td class="px-4 py-3 text-right ' + (item.inventory_change > 0 ? 'text-green-600' : 'text-red-600') + '">' + (item.inventory_change > 0 ? '+' : '') + item.inventory_change + '%</td>' +
                '<td class="px-4 py-3 text-right font-semibold ' + (item.gap_rate > 0 ? 'text-orange-600' : 'text-blue-600') + '">' + (item.gap_rate > 0 ? '+' : '') + item.gap_rate + '%</td>' +
                '<td class="px-4 py-3 text-center">' + getRiskBadge(item.risk_level) + '</td>' +
                '</tr>';
        }).join('');
    } else if (tab === 'rule5') {
        headers = '<th class="px-4 py-3 text-left">자재코드</th><th class="px-4 py-3 text-left">자재명</th><th class="px-4 py-3 text-right">구매금액 증감</th><th class="px-4 py-3 text-right">발주건수 증감</th><th class="px-4 py-3 text-right">괴리율</th><th class="px-4 py-3 text-center">위험도</th>';
        rows = data.slice(0, 15).map(function(item) {
            return '<tr class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onclick="showDetail(\'' + item.code + '\', \'rule5\')">' +
                '<td class="px-4 py-3 font-mono text-sm">' + item.code + '</td>' +
                '<td class="px-4 py-3">' + item.name.substring(0, 25) + (item.name.length > 25 ? '...' : '') + '</td>' +
                '<td class="px-4 py-3 text-right ' + (item.amount_change > 0 ? 'text-green-600' : 'text-red-600') + '">' + (item.amount_change > 0 ? '+' : '') + item.amount_change + '%</td>' +
                '<td class="px-4 py-3 text-right ' + (item.orders_change > 0 ? 'text-green-600' : 'text-red-600') + '">' + (item.orders_change > 0 ? '+' : '') + item.orders_change + '%</td>' +
                '<td class="px-4 py-3 text-right font-semibold ' + (item.gap_rate > 0 ? 'text-orange-600' : 'text-blue-600') + '">' + (item.gap_rate > 0 ? '+' : '') + item.gap_rate + '%</td>' +
                '<td class="px-4 py-3 text-center">' + getRiskBadge(item.risk_level) + '</td>' +
                '</tr>';
        }).join('');
    }
    
    let html = '<div class="flex items-center justify-between mb-4">';
    html += '<div>';
    html += '<h4 class="font-bold text-gray-800">' + rule.name + ': ' + rule.description + '</h4>';
    html += '<p class="text-sm text-gray-500">탐지 건수: ' + rule.count + '건 (' + rule.percentage + '%)</p>';
    html += '</div>';
    html += '</div>';
    html += '<div class="overflow-x-auto">';
    html += '<table class="w-full">';
    html += '<thead class="bg-gray-50"><tr>' + headers + '</tr></thead>';
    html += '<tbody>' + rows + '</tbody>';
    html += '</table>';
    html += '</div>';
    
    if (data.length > 15) {
        html += '<p class="text-center text-sm text-gray-500 mt-4">상위 15건만 표시됩니다.</p>';
    }
    
    content.innerHTML = html;
}

// Get risk badge
function getRiskBadge(level) {
    const badges = {
        high: '<span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">🔴 고위험</span>',
        medium: '<span class="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">🟠 주의</span>',
        low: '<span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">🟡 관심</span>'
    };
    return badges[level] || '';
}

// Show detail modal
function showDetail(code, ruleTab) {
    const data = analysisData.details[ruleTab].find(function(item) { return item.code === code; });
    if (!data) return;
    
    const material = analysisData.materials.find(function(m) { return m.code === code; });
    
    document.getElementById('modalTitle').textContent = data.name + ' (' + code + ')';
    
    let content = '<div class="grid grid-cols-2 gap-6">';
    content += '<div>';
    content += '<h4 class="font-bold text-gray-800 mb-3">📋 기본 정보</h4>';
    content += '<div class="space-y-2 text-sm">';
    content += '<p><span class="text-gray-500">자재코드:</span> <strong>' + code + '</strong></p>';
    content += '<p><span class="text-gray-500">공급업체:</span> ' + data.suppliers.join(', ') + '</p>';
    if (material) {
        content += '<p><span class="text-gray-500">계약시점:</span> ' + (material.contract_date || '-') + '</p>';
    }
    content += '</div>';
    content += '</div>';
    content += '<div>';
    content += '<h4 class="font-bold text-gray-800 mb-3">⚠️ 이상 징후</h4>';
    
    let riskClass = 'risk-low';
    if (data.risk_level === 'high') riskClass = 'risk-high';
    else if (data.risk_level === 'medium') riskClass = 'risk-medium';
    
    content += '<div class="p-3 rounded-lg ' + riskClass + '">';
    
    if (ruleTab === 'rule1' || ruleTab === 'rule2') {
        content += '<p class="text-sm"><span class="text-gray-600">평균값:</span> <strong>' + Number(data.avg_value).toLocaleString() + '</strong></p>';
        content += '<p class="text-sm"><span class="text-gray-600">현재값:</span> <strong>' + Number(data.current_value).toLocaleString() + '</strong></p>';
        content += '<p class="text-sm"><span class="text-gray-600">변동률:</span> <strong class="' + (data.change_rate > 0 ? 'text-green-600' : 'text-red-600') + '">' + (data.change_rate > 0 ? '+' : '') + data.change_rate + '%</strong></p>';
    } else if (ruleTab === 'rule3') {
        content += '<p class="text-sm"><span class="text-gray-600">재계약시점:</span> <strong>' + data.contract_date + '</strong></p>';
        content += '<p class="text-sm"><span class="text-gray-600">잔여기간:</span> <strong>' + data.months_remaining + '개월</strong></p>';
    } else if (ruleTab === 'rule4') {
        content += '<p class="text-sm"><span class="text-gray-600">구매금액 증감:</span> <strong>' + data.amount_change + '%</strong></p>';
        content += '<p class="text-sm"><span class="text-gray-600">재고금액 증감:</span> <strong>' + data.inventory_change + '%</strong></p>';
        content += '<p class="text-sm"><span class="text-gray-600">괴리율:</span> <strong>' + data.gap_rate + '%</strong></p>';
    } else if (ruleTab === 'rule5') {
        content += '<p class="text-sm"><span class="text-gray-600">구매금액 증감:</span> <strong>' + data.amount_change + '%</strong></p>';
        content += '<p class="text-sm"><span class="text-gray-600">발주건수 증감:</span> <strong>' + data.orders_change + '%</strong></p>';
        content += '<p class="text-sm"><span class="text-gray-600">괴리율:</span> <strong>' + data.gap_rate + '%</strong></p>';
    }
    
    content += '</div>';
    content += '</div>';
    content += '</div>';
    
    content += '<div class="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">';
    content += '<h4 class="font-bold text-gray-800 mb-2">🤖 HANA 분석 의견</h4>';
    content += '<p class="text-sm text-gray-700">' + getAIOpinion(data, ruleTab) + '</p>';
    content += '</div>';
    
    document.getElementById('modalContent').innerHTML = content;
    detailModal.classList.remove('hidden');
}

// Get AI opinion
function getAIOpinion(data, ruleTab) {
    if (ruleTab === 'rule1') {
        if (data.change_rate > 100) {
            return '이 자재는 유효월 평균 대비 수량이 ' + data.change_rate + '% 급증했습니다. 급격한 수량 증가는 다음 원인일 수 있습니다: 1) 신규 프로젝트 수주, 2) 재고 비축, 3) 데이터 입력 오류. 구매 담당자 확인을 권장드립니다.';
        } else if (data.change_rate < -50) {
            return '이 자재는 유효월 평균 대비 수량이 ' + Math.abs(data.change_rate) + '% 급감했습니다. 급격한 감소는 다음을 의심해볼 수 있습니다: 1) 공급 중단, 2) 대체재 사용, 3) 프로젝트 종료. 공급 안정성 확인이 필요합니다.';
        }
        return '이 자재는 평균 대비 ' + Math.abs(data.change_rate) + '%의 수량 변동이 있습니다. 정상적인 수요 변동인지 확인이 필요합니다.';
    } else if (ruleTab === 'rule2') {
        if (data.change_rate < -20) {
            return '이 자재는 평균 대비 단가가 ' + Math.abs(data.change_rate) + '% 하락했습니다. 급격한 단가 하락은 다음 원인일 수 있습니다: 1) 공급사 변경 또는 계약 조건 변경, 2) 품질 등급 변경 (스펙 다운), 3) 데이터 입력 오류, 4) 비정상적 거래 (담합, 리베이트 등). 👉 권고: 구매 담당자 확인 및 계약서 검토 필요';
        }
        return '이 자재는 단가가 ' + (data.change_rate > 0 ? '상승' : '하락') + '하여 ' + Math.abs(data.change_rate) + '% 변동했습니다. 시장 가격 동향과 비교 확인이 필요합니다.';
    } else if (ruleTab === 'rule3') {
        if (data.months_remaining <= 1) {
            return '⚠️ 긴급! 이 자재의 공급 계약이 ' + data.months_remaining + '개월 후 만료됩니다. 원활한 자재 수급을 위해 즉시 재계약 협상을 준비해 주세요. 공급 중단 시 대체 공급처 확보 계획도 수립하시기 바랍니다.';
        }
        return '이 자재의 계약 만료가 ' + data.months_remaining + '개월 후입니다. 재계약 협상 일정을 확인하고 미리 준비하시기 바랍니다.';
    } else if (ruleTab === 'rule4') {
        return '구매금액이 ' + data.amount_change + '% 변동한 반면, 재고금액은 ' + data.inventory_change + '% 변동하여 ' + Math.abs(data.gap_rate) + '%의 괴리가 발생했습니다. 재고 관리 적정성 확인이 필요합니다.';
    } else if (ruleTab === 'rule5') {
        return '구매금액이 ' + data.amount_change + '% 변동한 반면, 발주건수는 ' + data.orders_change + '% 변동하여 ' + Math.abs(data.gap_rate) + '%의 괴리가 발생했습니다. 발주 패턴 이상 여부 확인이 필요합니다.';
    }
    return '';
}

// Event listeners
startBtn.addEventListener('click', function() {
    if (startBtn.textContent.includes('다시')) {
        location.reload();
    } else {
        startAnalysis();
    }
});

document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        showTabContent(btn.dataset.tab);
    });
});

document.getElementById('closeModal').addEventListener('click', function() {
    detailModal.classList.add('hidden');
});

detailModal.addEventListener('click', function(e) {
    if (e.target === detailModal) {
        detailModal.classList.add('hidden');
    }
});
