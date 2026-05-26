/* 版本迭代展示页交互逻辑 */
document.addEventListener('DOMContentLoaded', function() {
    const VERSION_DATA = {
        '1982': {
            year: 1982,
            conference: '第五届全国人民代表大会第五次会议',
            date: '1982年12月4日',
            summary: '制定现行宪法，确立了以经济建设为中心、坚持四项基本原则、坚持改革开放的基本路线。',
            modifications: ['序言完整撰写', '确立根本制度', '规定公民权利'],
            content: null
        },
        '1988': {
            year: 1988,
            conference: '第七届全国人民代表大会第一次会议',
            date: '1988年4月12日',
            summary: '首次修正案，未涉及序言内容。',
            modifications: ['仅修改正文', '私营经济入宪', '土地使用权转让'],
            content: null
        },
        '1993': {
            year: 1993,
            conference: '第八届全国人民代表大会第一次会议',
            date: '1993年3月29日',
            summary: '第二次修正案，序言增加「我国正处于社会主义初级阶段」、「坚持改革开放」。',
            modifications: ['初级阶段入宪', '确立建设有中国特色社会主义理论', '多党合作入宪'],
            content: null
        },
        '1999': {
            year: 1999,
            conference: '第九届全国人民代表大会第二次会议',
            date: '1999年3月15日',
            summary: '第三次修正案，序言增加「邓小平理论」，调整为「长期处于初级阶段」。',
            modifications: ['邓小平理论入宪', '长期处于初级阶段', '法治入宪'],
            content: null
        },
        '2004': {
            year: 2004,
            conference: '第十届全国人民代表大会第二次会议',
            date: '2004年3月14日',
            summary: '第四次修正案，序言增加「三个代表重要思想」、「政治文明」、「社会主义事业建设者」。',
            modifications: ['三个代表重要思想入宪', '政治文明协调发展', '统一战线增加建设者'],
            content: null
        },
        '2018': {
            year: 2018,
            conference: '第十三届全国人民代表大会第一次会议',
            date: '2018年3月11日',
            summary: '第五次修正案，序言增加「科学发展观、习近平新时代中国特色社会主义思想」、「五位一体」、「人类命运共同体」。',
            modifications: ['习近平新时代中国特色社会主义思想入宪', '五位一体协调发展', '人类命运共同体', '贯彻新发展理念', '中华民族伟大复兴'],
            content: null
        }
    };

    initVersionsPage();

    async function initVersionsPage() {
        try {
            await loadVersionsData();
            renderTimeline();
            populateVersionSelects();
            initCompareButton();
        } catch (error) {
            console.error('版本页面初始化失败:', error);
        }
    }

    async function loadVersionsData() {
        try {
            const response = await fetch('data/versions.json');
            if (!response.ok) throw new Error('版本数据加载失败');
        } catch (err) {
            console.log('使用内置版本数据');
        }
    }

    function renderTimeline() {
        const timelineContainer = document.getElementById('timeline');
        if (!timelineContainer) return;

        const versions = Object.values(VERSION_DATA);
        
        timelineContainer.innerHTML = versions.map(version => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-year">${version.year}</div>
                    <div class="timeline-conference">${version.conference}</div>
                    <div class="timeline-summary">${version.summary}</div>
                    <div class="timeline-details">
                        ${version.modifications.map(mod => `<div class="timeline-modification">${mod}</div>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function populateVersionSelects() {
        const select1 = document.getElementById('version1');
        const select2 = document.getElementById('version2');

        const versions = Object.keys(VERSION_DATA);
        
        [select1, select2].forEach(select => {
            select.innerHTML = versions.map(year => 
                `<option value="${year}">${year}年宪法</option>`
            ).join('');
        });
        
        if (select1) select1.value = versions[0];
        if (select2) select2.value = versions[versions.length - 1];
    }

    function initCompareButton() {
        const compareBtn = document.getElementById('compareBtn');
        if (!compareBtn) return;

        compareBtn.addEventListener('click', performComparison);
    }

    function performComparison() {
        const select1 = document.getElementById('version1');
        const select2 = document.getElementById('version2');
        
        const version1 = select1.value;
        const version2 = select2.value;

        if (version1 === version2) {
            alert('请选择两个不同版本进行对比');
            return;
        }

        renderComparisonResult(version1, version2);
    }

    function renderComparisonResult(v1, v2) {
        const container = document.getElementById('compareResult');
        if (!container) return;

        const data1 = VERSION_DATA[v1];
        const data2 = VERSION_DATA[v2];

        const oldContent = `
            <p><strong>修改要点：</strong></p>
            <ul>
                ${data1.modifications.map(m => {
                    const highlighted = highlightChanges(m, v1);
                    return `<li>${highlighted}</li>`;
                }).join('')}
            </ul>
            <p><em>修改时间：${data1.date}</em></p>
        `;

        const newContent = `
            <p><strong>修改要点：</strong></p>
            <ul>
                ${data2.modifications.map(m => {
                    const highlighted = highlightChanges(m, v2);
                    return `<li>${highlighted}</li>`;
                }).join('')}
            </ul>
            <p><em>修改时间：${data2.date}</em></p>
        `;

        container.innerHTML = `
            <div class="compare-result">
                <div class="diff-panel">
                    <div class="diff-panel-header">${v1}年宪法（旧版本）</div>
                    <div class="diff-panel-body">
                        <div class="diff-content old">${oldContent}</div>
                    </div>
                </div>
                <div class="diff-panel">
                    <div class="diff-panel-header">${v2}年宪法（新版本）</div>
                    <div class="diff-panel-body">
                        <div class="diff-content new">${newContent}</div>
                    </div>
                </div>
            </div>
        `;
    }

    function highlightChanges(text, version) {
        const keywords = ['社会主义', '人民', '法治', '现代化', '初级阶段', '改革开放', '邓小平理论', '三个代表', '科学发展观', '习近平新时代', '人类命运共同体', '中华民族伟大复兴', '五位一体'];
        
        let result = text;
        keywords.forEach(keyword => {
            if (text.includes(keyword)) {
                result = result.replace(new RegExp(`(${keyword})`, 'g'), `<span class="diff-highlight">$1</span>`);
            }
        });
        return result;
    }

    function initScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15
        });

        document.querySelectorAll('.timeline-content').forEach(el => {
            observer.observe(el);
        });
    }

    // 渲染完成后初始化滚动动画
    const originalRenderTimeline = renderTimeline;
    renderTimeline = function() {
        originalRenderTimeline();
        initScrollAnimation();
    };
});