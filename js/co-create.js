/* 共创序言页交互逻辑 */
document.addEventListener('DOMContentLoaded', function() {
    let submissions = [];
    const KEYWORDS = ['人民', '法治', '团结', '民主', '平等', '社会主义', '复兴', '文明', '和谐', '现代化'];
    const STORAGE_KEY = 'const_co-create_submissions';

    initCoCreatePage();

    function initCoCreatePage() {
        loadSubmissions();
        bindEvents();
        renderWall();
    }

    function loadSubmissions() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                submissions = JSON.parse(saved);
            }
        } catch (err) {
            console.error('加载失败:', err);
            submissions = [];
        }
    }

    function saveSubmissions() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
        } catch (err) {
            console.error('保存失败:', err);
        }
    }

    function bindEvents() {
        const textarea = document.getElementById('userInput');
        if (textarea) {
            textarea.addEventListener('input', () => {
                updateCharCount();
            });
        }

        const submitBtn = document.getElementById('submitInput');
        if (submitBtn) {
            submitBtn.addEventListener('click', handleSubmit);
        }

        const generateBtn = document.getElementById('generateImage');
        if (generateBtn) {
            generateBtn.addEventListener('click', generateLongImage);
        }

        const openGuideBtn = document.getElementById('openGuideBtn');
        if (openGuideBtn) {
            openGuideBtn.addEventListener('click', openGuideModal);
        }

        const closeModalBtn = document.getElementById('closeModalBtn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeGuideModal);
        }

        const modalOverlay = document.getElementById('guideModal');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closeGuideModal();
                }
            });
        }
    }

    function openGuideModal() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeGuideModal() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    function updateCharCount() {
        const textarea = document.getElementById('userInput');
        const counter = document.querySelector('.char-count');
        if (textarea && counter) {
            counter.textContent = `${textarea.value.length} / 50`;
        }
    }

    function handleSubmit() {
        const textarea = document.getElementById('userInput');
        const text = textarea.value.trim();

        if (!text) {
            alert('请输入内容');
            return;
        }

        if (text.length > 50) {
            alert('内容不能超过50字');
            return;
        }

        const isValid = checkKeywords(text);

        const submission = {
            id: Date.now(),
            content: text,
            timestamp: new Date().toLocaleString('zh-CN'),
            likes: 0,
            liked: false,
            hasKeywords: isValid
        };

        submissions.unshift(submission);
        saveSubmissions();
        renderWall();

        textarea.value = '';
        updateCharCount();

        if (isValid) {
            showBadge();
        }

        document.getElementById('generateImage').disabled = false;
    }

    function checkKeywords(text) {
        let count = 0;
        for (const keyword of KEYWORDS) {
            if (text.includes(keyword)) {
                count++;
            }
        }
        return count >= 1;
    }

    function showBadge() {
        const badgeArea = document.getElementById('badgeArea');
        badgeArea.classList.remove('hidden');
        
        setTimeout(() => {
            badgeArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    function renderWall() {
        const container = document.getElementById('wallContent');
        const countEl = document.getElementById('wallCount');

        countEl.textContent = `${submissions.length} 条内容`;

        if (submissions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>暂无内容，快来成为第一个创作者吧！</p>
                </div>
            `;
            document.getElementById('generateImage').disabled = true;
            return;
        }

        document.getElementById('generateImage').disabled = false;

        const sorted = [...submissions].sort((a, b) => b.likes - a.likes);

        container.innerHTML = sorted.map((item, idx) => `
            <div class="content-card ${item.likes > 0 ? 'highlighted' : ''}">
                <div class="content-text">${escapeHtml(item.content)}</div>
                <div class="content-meta">
                    <span class="content-time">${item.timestamp}</span>
                    <button class="like-btn ${item.liked ? 'liked' : ''}" data-id="${item.id}">
                        ❤️ ${item.likes}
                    </button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', handleLike);
        });
    }

    function handleLike(event) {
        const id = parseInt(event.target.dataset.id);
        const item = submissions.find(s => s.id === id);
        if (item) {
            if (item.liked) {
                item.likes--;
                item.liked = false;
            } else {
                item.likes++;
                item.liked = true;
            }
            saveSubmissions();
            renderWall();
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function generateLongImage() {
        if (submissions.length === 0) {
            alert('请先添加至少一条内容！');
            return;
        }

        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.remove('hidden');

        const captureArea = document.getElementById('imageCaptureArea');

        const sorted = [...submissions].sort((a, b) => b.likes - a.likes);

        const contentHTML = sorted.slice(0, 20).map((item, idx) => `
            <div class="capture-item">
                <span class="capture-num">${idx + 1}</span>
                <span class="capture-text">${escapeHtml(item.content)}</span>
                <span class="capture-likes">❤️ ${item.likes}</span>
            </div>
        `).join('');

        captureArea.innerHTML = `
            <div class="capture-header">
                <h1 class="capture-title">全班共创 · 宪法序言</h1>
                <p class="capture-subtitle">2026 未来版</p>
            </div>
            <div class="capture-content">
                <p class="capture-intro">在这个充满希望的新时代，我们共同续写宪法序言的新篇章：</p>
                ${contentHTML}
            </div>
            <div class="capture-footer">
                <p class="capture-watermark">宪法序言交互学习系统 · ${new Date().toLocaleDateString('zh-CN')}</p>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .capture-area {
                position: fixed !important;
                left: -9999px !important;
                width: 800px;
                background: linear-gradient(180deg, #FAFAF8 0%, #F5F5F0 100%);
                padding: 60px;
                font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
                box-sizing: border-box;
            }
            .capture-header {
                text-align: center;
                margin-bottom: 40px;
                padding-bottom: 30px;
                border-bottom: 3px solid #8B1A1A;
            }
            .capture-title {
                font-size: 38px;
                color: #8B1A1A;
                margin: 0 0 12px;
                letter-spacing: 0.1em;
            }
            .capture-subtitle {
                font-size: 22px;
                color: #5a482c;
                margin: 0;
            }
            .capture-content {
                margin-bottom: 40px;
            }
            .capture-intro {
                font-size: 18px;
                color: #666;
                margin-bottom: 30px;
                text-align: center;
            }
            .capture-item {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                padding: 20px;
                margin-bottom: 16px;
                background: white;
                border-radius: 12px;
                border-left: 4px solid #D4AF37;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            .capture-num {
                flex-shrink: 0;
                width: 32px;
                height: 32px;
                background: #8B1A1A;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
            }
            .capture-text {
                flex: 1;
                font-size: 18px;
                color: #1A1A1A;
                line-height: 1.6;
            }
            .capture-likes {
                flex-shrink: 0;
                font-size: 14px;
                color: #999;
            }
            .capture-footer {
                text-align: center;
                padding-top: 30px;
                border-top: 1px solid rgba(139, 26, 26, 0.2);
            }
            .capture-watermark {
                font-size: 14px;
                color: rgba(139, 26, 26, 0.5);
                margin: 0;
            }
        `;
        captureArea.appendChild(style);

        captureArea.classList.remove('hidden');

        setTimeout(() => {
            html2canvas(captureArea, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#FAFAF8'
            }).then(canvas => {
                captureArea.classList.add('hidden');
                loadingOverlay.classList.add('hidden');
                style.remove();

                const link = document.createElement('a');
                link.download = `全班共创-宪法序言-${new Date().toFormat('YYYYMMDD')}.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
            }).catch(err => {
                captureArea.classList.add('hidden');
                loadingOverlay.classList.add('hidden');
                style.remove();
                console.error('生成失败:', err);
                alert('生成失败，请重试！');
            });
        }, 300);
    }

    Date.prototype.toFormat = function(format) {
        const y = this.getFullYear();
        const m = String(this.getMonth() + 1).padStart(2, '0');
        const d = String(this.getDate()).padStart(2, '0');
        return `${y}${m}${d}`;
    };
});