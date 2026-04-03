(function() {
    const shipConfig = { engine: 'by' };
    let scClear = document.querySelector('#ship-clear');
    let scInput = document.querySelector('#ship-input');
    let scVal = '';
    let curEngine = null;

    // 初始化
    function init() {
        if (!scInput) return;

        // 加载记忆的引擎
        let savedId = localStorage.getItem('curShipId') || '#' + shipConfig.engine;
        curEngine = document.querySelector(savedId);
        if (curEngine) curEngine.classList.add('activated');

        // 输入监听
        scInput.addEventListener('input', function() {
            scVal = this.value.trim();
            if (scClear) scClear.style.opacity = scVal ? '1' : '0';
        });

        // 回车监听
        scInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                executeJump();
            }
        });
    }

// 暴露给 HTML onclick 的选择函数
window.selectShipEngine = function(e) {
    // 1. 移除所有引擎的激活状态
    document.querySelectorAll('.engine-item').forEach(el => {
        el.classList.remove('activated');
    });
    
    // 2. 给当前点击的引擎添加激活状态
    curEngine = e.currentTarget;
    curEngine.classList.add('activated');
    
    // 3. 记录选择到本地存储
    localStorage.setItem('curShipId', '#' + curEngine.id);
};	

    window.clearShipVal = function() {
        scInput.value = '';
        scVal = '';
        scClear.style.opacity = '0';
        scInput.focus();
    };

    function executeJump() {
        if (!scVal) return;

        // 简单判断是否是网址
        if (/^(http|www\.)/i.test(scVal)) {
            window.open(scVal.startsWith('http') ? scVal : 'https://' + scVal);
            return;
        }

        let base = 'https://cn.bing.com/search?q=';
        if (curEngine.id === 'bd') base = 'https://www.baidu.com/s?wd=';
        if (curEngine.id === 'go') base = 'https://www.google.com/search?q=';

        window.open(base + encodeURIComponent(scVal));
    }

    init();
})();