document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initActiveLinks();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarNav = document.querySelector('.navbar-nav');

  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarNav.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target)) {
        navbarToggle.classList.remove('active');
        navbarNav.classList.remove('open');
      }
    });
  }
}

function initActiveLinks() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.navbar-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function highlightKeywords(container, keywords) {
  if (!container) return;

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const textNodes = [];
  let node;
  while (node = walker.nextNode()) {
    if (node.nodeValue.trim() && !node.parentElement.classList.contains('highlight')) {
      textNodes.push(node);
    }
  }

  textNodes.forEach(textNode => {
    let content = textNode.nodeValue;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'g');
      content = content.replace(regex, '§§HIGHLIGHT§§$1§§ENDHIGHLIGHT§§');
    });

    if (content !== textNode.nodeValue) {
      const span = document.createElement('span');
      span.innerHTML = content
        .replace(/§§HIGHLIGHT§§/g, '<span class="highlight">')
        .replace(/§§ENDHIGHLIGHT§§/g, '</span>');
      textNode.parentNode.replaceChild(span, textNode);
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const CONSTITUTION_KEYWORDS = [
  '人民', '法治', '团结', '民主', '平等', '社会主义', '复兴', '文明', '和谐',
  '宪法', '国家', '中国共产党', '无产阶级', '现代化', '统一', '独立', '自由'
];

window.ConstituteApp = {
  highlightKeywords,
  debounce,
  CONSTITUTION_KEYWORDS
};

// 首页模块卡片点击跳转
(function() {
  const moduleCards = document.querySelectorAll('.module-card[data-href]');
  
  moduleCards.forEach(card => {
    card.addEventListener('click', function() {
      const href = this.dataset.href;
      if (href) {
        window.location.href = href;
      }
    });
  });
})();

// Hero背景粒子效果
(function() {
  const dotContainer = document.getElementById('heroDots');
  
  if (!dotContainer) return;
  
  const colors = ['rgba(122, 22, 22, 0.4)', 'rgba(201, 162, 39, 0.4)', 'rgba(122, 22, 22, 0.2)', 'rgba(201, 162, 39, 0.2)'];
  
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: dotFloat ${8 + Math.random() * 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 8}s;
    `;
    dotContainer.appendChild(dot);
  }
})();


