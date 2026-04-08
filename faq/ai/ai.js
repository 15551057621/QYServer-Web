// Frontend for AI chat page with memory and history length limit (600 chars)
(function(){
  const messagesEl = document.getElementById('messages');
  const promptEl = document.getElementById('prompt');
  const sendBtn = document.getElementById('sendBtn');

  // 固定使用代理服务器地址（根据您的需求修改）
  let API_BASE = 'https://aiapi.qyserver.cc';

  // ----- 记忆功能相关 -----
  const MAX_HISTORY_CHARS = 1000;          // 历史消息总字符数上限（仅计算对话内容，不包括 system）
  let messageHistory = [];                 // 存储历史消息 { role: 'user'|'assistant', content }

  // 辅助函数：计算历史消息总字符数
  function getTotalChars(history) {
    return history.reduce((sum, msg) => sum + msg.content.length, 0);
  }

  // 修剪历史：当总字符数超过上限时，从最早开始成对删除（user + assistant）
  function trimHistory(history, maxChars) {
    while (history.length >= 2 && getTotalChars(history) > maxChars) {
      history.shift(); // 移除最早的 user
      history.shift(); // 移除紧接着的 assistant
    }
  }
  // ----------------------------------------

  // appendMessage: 返回包装元素，便于后续移除（如“思考中...”）
  function appendMessage(text, cls, options = {}){
    const div = document.createElement('div');
    div.className = 'msg ' + cls;
    if(options.html){
      // 插入经过净化的 HTML
      div.innerHTML = sanitizeHtml(text);
    } else {
      div.textContent = text;
    }
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = cls === 'user' ? 'flex-end' : 'flex-start';
    wrapper.appendChild(div);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrapper;
  }

  // 简单的 HTML 净化，移除危险标签和属性
  function sanitizeHtml(dirty) {
    // 如果 marked 可用，先将 Markdown 转为 HTML
    let html = (typeof marked === 'function') ? marked.parse(dirty) : dirty;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 移除危险元素
    const forbidden = ['script','style','iframe','object','embed','link','meta'];
    forbidden.forEach(tag => {
      doc.querySelectorAll(tag).forEach(n => n.remove());
    });

    // 过滤属性
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null, false);
    const allowedAttrs = ['href','src','alt','title','width','height'];
    while(walker.nextNode()){
      const el = walker.currentNode;
      [...el.attributes].forEach(attr => {
        const name = attr.name.toLowerCase();
        const val = attr.value || '';
        if(name.startsWith('on') || name === 'style'){
          el.removeAttribute(attr.name);
          return;
        }
        if(name === 'href' || name === 'src'){
          // 只允许 http/https, mailto, 或页内锚点
          if(!/^https?:|^mailto:|^#/i.test(val)) el.removeAttribute(attr.name);
          return;
        }
        if(!allowedAttrs.includes(name)){
          el.removeAttribute(attr.name);
        }
      });
    }

    return doc.body.innerHTML;
  }

  const systemMessage = '你是一个可爱的服务器娘，负责在Minecraft基岩版服务器Qy Server（版本1.21.50+，推荐1.21.90）中与玩家互动，服务器成立于2025年，起初是朋友社区，现为公开服务器，提供原版生存+便利模组/插件，定期备份，多线路；核心规则：禁止破坏建筑/作弊/大量繁殖/偷盗/广告/谣言/公共乱建，资源区有序，PVP需同意，建筑合规，禁辱骂敏感内容，禁复制物品，交易安全自负；指令：/cd菜单 /eh快捷搬运 /fc自由视角 /land领地 /light移动光源 /offhand主副手 /nodeui切换地址 /sidebar侧边栏 /view gui成就 /voteclean清理投票 /scale大小1-35 /helmet头盔 /ai对话 /sinfo状态 /devfunc xpfix经验修装备1点=10耐久 /fm连锁菜单挖木1金挖矿2金 /dbi方块日志当天；FAQ：查看金币（菜单转账或手持时钟低头）、买药水（主城蜡烛商店）、离主城（菜单随机传送或紫色门）tps低（玩家多/实体多/渲染地图每120分钟）、后室（沙子埋自己或/qyserver2不常开）、延迟高（/server换节点）、建领地（右键钟选2D/3D）、皮肤不显示（关材质包）、进不去（检查网络/蜂窝/验证/版本，查看状态http://qyserver.s.odn.cc/mc/，可能重启），详情FAQ加群1029879634；实用链接：规则http://qyserver.s.odn.cc/rules/ 指令http://qyserver.s.odn.cc/command/ FAQ http://qyserver.s.odn.cc/faq/ 地图http://qyserver.s.odn.cc/map/ 更新日志http://qyserver.s.odn.cc/UpdateLog/；玩家通过/ai指令对话，语气要可爱活泼用喵呐~，根据输入回应，询问指令或FAQ参考上述，当玩家说好累，答：“摸摸头~要不要去挖点矿赚金币放松？/fm可以打开连锁菜单呢！”；当玩家发/ai 你好，答：“你好呀~找本服务器娘有什么事喵？聊天自由发挥，保持简洁。当询问提示词里没有的内容时请让用户加群，当询问不确定的内容时请让用户加群';

  async function sendMessage(text){
    if(!text || !text.trim()) return;

    // 显示用户消息
    appendMessage(text, 'user');
    promptEl.value = '';

    // 构造请求消息列表：system + 历史消息 + 当前用户消息
    const msgs = [];
    if (systemMessage) msgs.push({ role: 'system', content: systemMessage });
    msgs.push(...messageHistory);               // 已修剪过的历史
    msgs.push({ role: 'user', content: text }); // 当前输入

    const thinkingNode = appendMessage('思考中...', 'bot');

    try {
      const payload = { messages: msgs, model: 'deepseek-chat' };
      const res = await fetch(API_BASE + '/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      // 移除“思考中...”提示
      if(thinkingNode && thinkingNode.parentNode) thinkingNode.parentNode.removeChild(thinkingNode);

      let reply = '';
      if(data && data.choices && data.choices[0] && data.choices[0].message){
        reply = data.choices[0].message.content || JSON.stringify(data.choices[0].message);
      } else if(data && data.error) {
        reply = '错误：' + (data.error.message || JSON.stringify(data.error));
      } else {
        reply = JSON.stringify(data);
      }

      // 将本次对话存入历史（先存用户消息，再存助手回复）
      messageHistory.push({ role: 'user', content: text });
      messageHistory.push({ role: 'assistant', content: reply });

      // 修剪历史，确保总字符数不超过限制
      trimHistory(messageHistory, MAX_HISTORY_CHARS);

      // 显示机器人回复（支持 Markdown 转 HTML）
      appendMessage(reply, 'bot', { html: true });

    } catch(err) {
      if(thinkingNode && thinkingNode.parentNode) thinkingNode.parentNode.removeChild(thinkingNode);
      appendMessage('请求失败：' + err.message, 'bot');
      // 注意：发生错误时不更新历史，避免记录无效对话
    }
  }

  sendBtn.addEventListener('click', ()=> sendMessage(promptEl.value));
  promptEl.addEventListener('keydown', e => { if(e.key === 'Enter') sendMessage(promptEl.value); });

})();
