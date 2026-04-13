/* ========================================
   QYServer 全站公共 JS
   包含：导航栏滚动、音乐控制、弹窗、平滑滚动等
   ======================================== */

(function () {
    'use strict';
    // 页面加载完成后隐藏动画
    window.addEventListener('load', function () {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 400); // 等淡出动画完成后再移除
        }
    });

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
    // 加载超时提示已移动到加载动画内部（lib/AllComponents.js）

    // ---------- 初始化所有功能 ----------
    document.addEventListener('DOMContentLoaded', function () {
        initNavbarScroll();
        initMusicControl();
        initSmoothScroll();
        initResetPopup();
    });

})();