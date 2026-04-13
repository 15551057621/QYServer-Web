/* ========================================
   QYServer 全站公共 JS
   包含：导航栏滚动、音乐控制、弹窗、平滑滚动等
   ======================================== */

(function () {
    'use strict';

    // ---------- 导航栏滚动效果 ----------
    function initNavbarScroll() {
        const menuBox = document.getElementById('menu-box');
        const banner = document.getElementById('banner');
        if (!menuBox || !banner) return;

        window.addEventListener('scroll', function () {
            const bannerHeight = banner.offsetHeight;
            if (window.scrollY > bannerHeight * 0.2) {
                menuBox.classList.add('scrolled');
            } else {
                menuBox.classList.remove('scrolled');
            }
        });
    }

    // ---------- 音乐播放控制 ----------
    function initMusicControl() {
        const bgMusic = document.getElementById('bgMusic');
        const musicControl = document.getElementById('musicControl');
        const musicIcon = document.getElementById('musicIcon');
        if (!bgMusic || !musicControl || !musicIcon) return;

        let musicPlaying = false;

        // 完整的暂停图标 Base64
        const PAUSE_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTMgOXY2aDNsNS41IDVWMTRsLTQuNS00LjVIM3ptMTAgNnYtMTJIMTB2MTJsMy41IDMuNS0yIDEuNS02LTYgNi02IDIgMS41LTMuNSAzLjV6Ii8+PC9zdmc+";

        // 完整的播放图标 Base64
        const PLAY_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTMgOXY2aDNsNS41IDVWMTRsLTQuNS00LjVIM1ptMTAtMi41VjNIMTB2MTMuNWwtMi41LTIuNS0yIDIgNSA1IDUtNVY2LjV6Ii8+PC9zdmc+";

        musicControl.addEventListener('click', function () {
            if (musicPlaying) {
                bgMusic.pause();
                musicIcon.src = PAUSE_ICON;
            } else {
                bgMusic.play().catch(e => console.log("播放失败:", e));
                musicIcon.src = PLAY_ICON;
            }
            musicPlaying = !musicPlaying;
        });
    }

    // ---------- 弹窗逻辑 ----------
    function initPopup() {
        const popupOverlay = document.getElementById('popupOverlay');
        const popupConfirm = document.getElementById('popupConfirm');
        const dontShowAgain = document.getElementById('dontShowAgain');

        if (!popupOverlay || !popupConfirm) return;

        // 检查是否应该显示弹窗
        if (localStorage.getItem('dontShowPopu') !== 'true') {
            setTimeout(function () {
                popupOverlay.style.display = 'flex';
            }, 2000);
        }

        // 确认按钮
        popupConfirm.addEventListener('click', function () {
            if (dontShowAgain && dontShowAgain.checked) {
                localStorage.setItem('dontShowPopu', 'true');
            }
            popupOverlay.style.display = 'none';
        });

        // 点击遮罩关闭
        popupOverlay.addEventListener('click', function (e) {
            if (e.target === popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }

    // ---------- 平滑滚动 ----------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ---------- 重置弹窗按钮 ----------
    function initResetPopup() {
        const resetBtn = document.getElementById('resetPopup');
        if (!resetBtn) return;

        resetBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('dontShowPopu');
            alert('弹窗设置已重置，下次访问时将再次显示提示');
        });
    }

    // ---------- 初始化所有功能 ----------
    document.addEventListener('DOMContentLoaded', function () {
        initNavbarScroll();
        initMusicControl();
        initPopup();
        initSmoothScroll();
        initResetPopup();
    });

})();