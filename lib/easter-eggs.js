/* ========================================
    QYServer 彩蛋合集（修复版）
    修复：Toast 动画、透明度、堆叠问题
   ======================================== */

(function () {
    'use strict';
    injectStyles();

    // ========== 🥚1: Konami Code ===========
    (function () {
        const konamiCode = [// 上上下下左右左右BA
            'ArrowUp',
            'ArrowUp',
            'ArrowDown',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowLeft',
            'ArrowRight',
            'b', 'a'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', function (e) {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateRainbowMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        function activateRainbowMode() {
            // 创建彩虹遮罩
            const overlay = document.createElement('div');
            overlay.id = 'rainbow-overlay';
            overlay.style.cssText = `
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    pointer-events: none;
                    background: linear-gradient(
                        90deg,
                        rgba(255,0,0,0.15),
                        rgba(255,127,0,0.15),
                        rgba(255,255,0,0.15),
                        rgba(0,255,0,0.15),
                        rgba(0,0,255,0.15),
                        rgba(75,0,130,0.15),
                        rgba(143,0,255,0.15)
                    );
                    animation: rainbowMove 3s linear infinite;
                `;
            document.body.appendChild(overlay);

            // 添加动画样式
            const style = document.createElement('style');
            style.textContent = `
                    @keyframes rainbowMove {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
            document.head.appendChild(style);
            showToast("↑↑↓↓←→←→ba！")

            // 5秒后自动移除
            /*setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    style.remove();
                }, 500);
            }, 5000);*/
        }
    })();

    (function () {
        const konamiCode = [ // 大写的BA
            'ArrowUp', 'ArrowUp',
            'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight',
            'ArrowLeft', 'ArrowRight',
            'B', 'A'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', function (e) {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateKonami();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        function activateKonami() {
            // 创建覆盖层
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 99999;
                pointer-events: none;
                background: linear-gradient(45deg, 
                    rgba(255,0,0,0.05), rgba(255,165,0,0.05), 
                    rgba(255,255,0,0.05), rgba(0,255,0,0.05), 
                    rgba(0,0,255,0.05), rgba(75,0,130,0.05), 
                    rgba(238,130,238,0.05));
                background-size: 400% 400%;
                animation: konamiRainbow 1s ease infinite;
            `;
            document.body.appendChild(overlay);

            // 添加旋转动画
            const styleEl = document.createElement('style');
            styleEl.textContent = `
                @keyframes konamiRainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes konamiShake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-2deg); }
                    75% { transform: rotate(2deg); }
                }
                body.konami-active {
                    animation: konamiShake 0.3s ease infinite !important;
                }
            `;
            document.head.appendChild(styleEl);
            document.body.classList.add('konami-active');

            // 显示提示
            showToast('🎮 Konami Code 已激活！服务器娘很开心~');

            // 5秒后移除
            setTimeout(function () {
                overlay.remove();
                document.body.classList.remove('konami-active');
                styleEl.remove();
                showToast('💫 效果已消失');
            }, 5000);
        }
    })();

    // ========== 🥚2: Logo 连击 ==========
    (function () {
        let clicks = 0, timer = null;
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.logo a, .logo h2').forEach(function (link) {
                link.addEventListener('click', function (e) {
                    if (e.ctrlKey || e.metaKey) return;
                    clicks++;
                    if (timer) clearTimeout(timer);
                    timer = setTimeout(function () { clicks = 0; }, 2000);
                    if (clicks >= 10) {
                        e.preventDefault();
                        clicks = 0;
                        clearTimeout(timer);
                        activateEmojiRain();
                    }
                });
            });
        });
        function activateEmojiRain() {
            const emojis = ['🎮', '⛏️', '💎', '🌟', '🐱', '🎉', '✨', '💖', '🌈', '🍀', '🏰', '⚔️', '🛡️', '🔥', '❄️', '🎵', '🏆', '🤖', '👑'];
            const container = document.createElement('div');
            container.style.cssText = 'position:fixed;inset:0;z-index:99998;pointer-events:none;overflow:hidden;';
            document.body.appendChild(container);
            for (let i = 0; i < 50; i++) {
                setTimeout(function () {
                    const emoji = document.createElement('span');
                    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    emoji.style.cssText = `position:absolute;top:-50px;left:${Math.random() * 100}%;font-size:${20 + Math.random() * 40}px;animation:emojiFall ${2 + Math.random() * 3}s linear forwards;opacity:0.9;`;
                    container.appendChild(emoji);
                    emoji.addEventListener('animationend', function () { emoji.remove(); });
                }, i * 80);
            }
            showToast('🎉 恭喜触发隐藏彩蛋！');
            setTimeout(function () { container.remove(); }, 5000);
        }
    })();

    // ========== 🥚3: 隐藏成就 ==========
    (function () {
        let input = '';
        const word = 'qyserver';
        document.addEventListener('keydown', function (e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
            if (e.key.length === 1) {
                input += e.key.toLowerCase();
                if (input.length > word.length) input = input.slice(-word.length);
                if (input === word) {
                    input = '';
                    showAchievement('🔍 发现彩蛋', '你在页面空白处输入了服务器的名字！');
                }
            }
        });
    })();

    // ========== 🥚4: 关于页隐藏时间线 ==========
    (function () {
        if (!location.pathname.includes('/about/')) return;
        let clicks = 0, ons = false;
        setTimeout(function () {
            const last = document.querySelector('.timeline-item:last-child');
            if (!last) return;
            last.style.cursor = 'pointer';
            last.addEventListener('click', function () {
                if (ons) return;
                clicks++;
                if (clicks >= 3) {
                    ons = true;
                    clicks = 0;
                    const timeline = document.querySelector('.timeline');
                    if (!timeline) return;
                    const item = document.createElement('div');
                    item.className = 'timeline-item';
                    item.innerHTML = `<div class="timeline-content" style="background:linear-gradient(135deg,rgba(248,165,194,.1),rgba(165,109,226,.1));border:2px dashed #f8a5c2;"><div class="timeline-date">????年??月</div><p>嘘~ 你发现了隐藏的时间线！</p><p style="font-size:.8rem;color:#999;">「每一个玩家都是QYServer故事的一部分」</p></div>`;
                    timeline.appendChild(item);
                    showToast('🔮 隐藏时间线已解锁！');
                    item.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }, 1000);
    })();

    // ========== 🥚5: 标题双击粒子 ==========
    (function () {
        if (location.pathname !== '/' && location.pathname !== '') return;
        setTimeout(function () {
            const h2 = document.querySelector('.join-item h2');
            if (!h2) return;
            h2.title = '双击试试？';
            h2.addEventListener('dblclick', function () {
                h2.style.animation = 'titleShake 0.5s ease';
                setTimeout(function () { h2.style.animation = ''; }, 500);
                const rect = h2.getBoundingClientRect();
                const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
                const colors = ['#f8a5c2', '#a56de2', '#ff6b9d', '#7c3aed', '#ffd700'];
                for (let i = 0; i < 20; i++) {
                    const p = document.createElement('div');
                    const angle = (Math.PI * 2 * i) / 20, dist = 50 + Math.random() * 100;
                    p.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:8px;height:8px;border-radius:50%;background:${colors[Math.floor(Math.random() * colors.length)]};z-index:99999;pointer-events:none;animation:particleBurst 1s ease-out forwards;--tx:${Math.cos(angle) * dist}px;--ty:${Math.sin(angle) * dist}px;`;
                    document.body.appendChild(p);
                    p.addEventListener('animationend', function () { p.remove(); });
                }
            });
        }, 1000);
    })();

    // ========== 🥚6: Ctrl+Shift+Q ==========
    (function () {
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
                e.preventDefault();
                const dialogs = [
                    { text: '哼！又偷偷按快捷键！', emoji: '(￣^￣)' },
                    { text: '服务器娘今天也很努力呢~', emoji: '✨' },
                    { text: '不要在控制台里乱翻啦！', emoji: '(╯°□°）╯' },
                    { text: '有什么问题可以去FAQ看看哦', emoji: '📖' },
                    { text: '你找到我啦~ 这是第几个彩蛋呢？', emoji: '🥚' },
                    { text: '悄悄告诉你：输入 qyserver 有惊喜', emoji: '🤫' }
                ];
                const d = dialogs[Math.floor(Math.random() * dialogs.length)];
                const b = document.createElement('div');
                b.style.cssText = 'position:fixed;bottom:100px;right:30px;z-index:99999;background:rgba(0, 0, 0, 0.23);color:#fff;padding:20px 25px;border-radius:20px;max-width:300px;animation:achievementSlide .5s ease forwards;box-shadow:0 8px 30px rgba(0,0,0,.4);border:2px solid #f8a5c2;';
                b.innerHTML = `<div style="font-size:2rem;margin-bottom:10px;">${d.emoji}</div><div style="font-size:1rem;line-height:1.5;">${d.text}</div><div style="font-size:.8rem;color:#f8a5c2;margin-top:10px;">—— 服务器娘</div>`;
                document.body.appendChild(b);
                setTimeout(function () {
                    b.style.animation = 'achievementFadeOut .4s ease forwards';
                    b.addEventListener('animationend', function h() { if (b.parentNode) b.remove(); b.removeEventListener('animationend', h); });
                }, 4000);
            }
        });
    })();

    // ========== 🥚7: FAQ 搜索 42 ==========
    (function () {
        if (!location.pathname.includes('/faq/')) return;
        setTimeout(function () {
            const inp = document.getElementById('search');
            if (!inp) return;
            inp.addEventListener('input', function () {
                if (this.value.trim() === '42') {
                    setTimeout(function () {
                        const list = document.getElementById('problem-list');
                        if (!list) return;
                        const item = document.createElement('li');
                        item.style.cssText = 'background:linear-gradient(135deg,rgba(248,165,194,.1),rgba(165,109,226,.1))!important;border-left:4px solid #ffd700!important;animation:achievementSlide .5s ease;';
                        item.innerHTML = '<a href="javascript:void(0)" style="font-size:1.5rem!important;cursor:default;">🐬 42 —— 生命、宇宙以及一切的答案</a><small>——道格拉斯·亚当斯《银河系漫游指南》</small><span><mark>彩蛋</mark></span>';
                        if (list.firstChild) list.insertBefore(item, list.firstChild); else list.appendChild(item);
                        setTimeout(function () { item.remove(); }, 8000);
                    }, 100);
                }
            });
        }, 1000);
    })();

    // ========== 🥚8: 闲置标题 ==========
    (function () {
        const orig = document.title;
        const idle = '💤 等你回来~ —— QYServer';
        let timer = null;
        function reset() {
            if (timer) clearTimeout(timer);
            document.title = orig;
            if (document._idleInterval) { clearInterval(document._idleInterval); document._idleInterval = null; }
            timer = setTimeout(function () {
                let offset = 0;
                document._idleInterval = setInterval(function () {
                    offset = (offset + 1) % idle.length;
                    document.title = idle.substring(offset) + ' ' + idle.substring(0, offset);
                }, 200);
            }, 120000);
        }
        ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(function (ev) {
            document.addEventListener(ev, reset);
        });
        reset();
    })();





    // ========== 注入动画样式（仅一次） ==========
    function injectStyles() {
        if (document.getElementById('easterEgg-animations')) return;
        const styleEl = document.createElement('style');
        styleEl.id = 'easterEgg-animations';
        styleEl.textContent = `
            /* Toast 动画 */
            @keyframes toastSlideIn {
                from { transform: translateX(-50%) translateY(100px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            @keyframes toastFadeOut {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
            /* 成就滑入 */
            @keyframes achievementSlide {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes achievementFadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
            }
            /* 彩蛋覆盖层 */
            @keyframes konamiRainbow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes konamiShake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-2deg); }
                75% { transform: rotate(2deg); }
            }
            body.konami-active {
                animation: konamiShake 0.3s ease infinite !important;
            }
            /* 表情雨 */
            @keyframes emojiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
            }
            /* 粒子爆发 */
            @keyframes titleShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px) rotate(-2deg); }
                75% { transform: translateX(10px) rotate(2deg); }
            }
            @keyframes particleBurst {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(styleEl);
    }


    // ========== Toast 函数（修复版） ==========
    function showToast(message) {
        // 移除旧的
        const old = document.querySelector('.easter-egg-toast');
        if (old) old.remove();

        const toast = document.createElement('div');
        toast.className = 'easter-egg-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.50);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: #fff;
            padding: 14px 28px;
            border-radius: 50px;
            font-size: 15px;
            font-weight: 500;
            letter-spacing: 0.5px;
            z-index: 100000;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(248,165,194,0.3);
            animation: toastSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(function () {
            toast.style.animation = 'toastFadeOut 0.4s ease forwards';
            toast.addEventListener('animationend', function handler() {
                if (toast.parentNode) toast.remove();
                toast.removeEventListener('animationend', handler);
            });
        }, 2500);
    }

    // ========== 显示成就 ==========
    function showAchievement(title, desc) {
        const old = document.querySelector('.easter-egg-achievement');
        if (old) old.remove();

        const achievement = document.createElement('div');
        achievement.className = 'easter-egg-achievement';
        achievement.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 99999;
            background: rgba(0,0,0,0.50);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: #fff;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #f8a5c2;
            animation: achievementSlide 0.5s ease forwards;
            max-width: 300px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        `;
        achievement.innerHTML = `
            <div style="font-size:1.2rem;font-weight:bold;margin-bottom:8px;">
                <i class="fas fa-trophy" style="color:#ffd700;"></i> ${title}
            </div>
            <div style="font-size:0.9rem;color:#ddd;line-height:1.5;">${desc}</div>
        `;
        document.body.appendChild(achievement);

        setTimeout(function () {
            achievement.style.animation = 'achievementFadeOut 0.4s ease forwards';
            achievement.addEventListener('animationend', function handler() {
                if (achievement.parentNode) achievement.remove();
                achievement.removeEventListener('animationend', handler);
            });
        }, 4000);
    }

    // 暴露到全局
    window.easterEggToast = showToast;
})();