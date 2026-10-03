// e:HEV Tech page interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar panel navigation
    var navBtns = document.querySelectorAll('.ehev-nav-btn');
    var panels = document.querySelectorAll('.ehev-panel');

    function showPanel(id) {
        navBtns.forEach(function(btn) {
            var isActive = btn.dataset.panel === id;
            btn.classList.toggle('active', isActive);
            // Keep active tab visible in horizontal mobile scroll
            if (isActive && btn.scrollIntoView) {
                try {
                    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } catch (err) { /* older browsers */ }
            }
        });
        panels.forEach(function(panel) {
            panel.classList.toggle('active', panel.id === id);
        });
        var main = document.querySelector('.ehev-main');
        if (main && window.innerWidth <= 768) {
            main.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            showPanel(this.dataset.panel);
        });
    });

    // TOC links open corresponding panel
    document.querySelectorAll('.ehev-toc a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var id = this.getAttribute('href').replace('#', '');
            if (document.getElementById(id) && document.getElementById(id).classList.contains('ehev-panel')) {
                e.preventDefault();
                showPanel(id);
                var target = document.getElementById(id);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Component tabs (Image of e:HEV System)
    var compTabs = document.querySelectorAll('.comp-tab');
    var compItems = document.querySelectorAll('.comp-detail-item');
    var compMarkers = document.querySelectorAll('.comp-marker');
    var compCallouts = document.querySelectorAll('.comp-callout');

    function showComponent(num) {
        compTabs.forEach(function(tab) {
            var isActive = tab.dataset.comp === num;
            tab.classList.toggle('active', isActive);
            // Keep active component tab visible in horizontal scroll
            if (isActive && tab.scrollIntoView) {
                try {
                    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } catch (err) { /* older browsers */ }
            }
        });
        compItems.forEach(function(item) {
            item.classList.toggle('active', item.dataset.comp === num);
        });
        compMarkers.forEach(function(marker) {
            marker.classList.toggle('active', marker.dataset.mark === num);
        });
        compCallouts.forEach(function(callout) {
            callout.style.display = 'none';
            callout.classList.remove('highlight');
        });
        // Show matching callout
        var posMap = { '1': 'motor', '2': 'engine', '3': 'clutch', '4': 'pcu', '5': 'battery' };
        var pos = posMap[num];
        if (pos) {
            var c = document.querySelector('.comp-callout[data-pos="' + pos + '"]');
            if (c) {
                c.style.display = 'block';
                c.classList.add('highlight');
            }
        }
    }

    compTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            showComponent(this.dataset.comp);
        });
    });

    compMarkers.forEach(function(marker) {
        marker.addEventListener('click', function() {
            showComponent(this.dataset.mark);
        });
    });

    // Initialize first component state
    showComponent('1');

    // FAQ accordion on e:HEV page
    document.querySelectorAll('.ehev-faq .faq-question').forEach(function(q) {
        q.addEventListener('click', function() {
            var item = this.parentElement;
            var wasActive = item.classList.contains('active');
            document.querySelectorAll('.ehev-faq .faq-item').forEach(function(faq) {
                faq.classList.remove('active');
            });
            if (!wasActive) item.classList.add('active');
        });
    });

    // Subscribe form
    var subForm = document.getElementById('ehevSubscribe');
    if (subForm) {
        subForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing! You will receive the latest e:HEV updates from Honda Township.');
            this.reset();
        });
    }
});
