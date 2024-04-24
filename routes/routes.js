const express = require('express');
const mysql = require('mysql2');
const route = express.Router();
route.get('/', (req, res, next) => {
    res.render('index', { title: 'Dashboard'});
})
route.get('/index', (req, res, next) => {
    res.render('index', { title: 'Dashboard'});
})



// Apps
route.get('/apps-calendar', (req, res, next) => {
    res.render('apps-calendar', { title: 'Calendar'});
})
route.get('/apps-chat', (req, res, next) => {
    res.render('apps-chat', { title: 'Chat'});
})
route.get('/apps-email-inbox', (req, res, next) => {
    res.render('apps-email-inbox', { title: 'Inbox'});
})
route.get('/apps-email-read', (req, res, next) => {
    res.render('apps-email-read', { title: 'Email Read'});
})
route.get('/apps-tasks', (req, res, next) => {
    res.render('apps-tasks', { title: 'Tasks'});
})
route.get('/apps-tasks-details', (req, res, next) => {
    res.render('apps-tasks-details', { title: 'Task Detail'});
})
route.get('/apps-kanban', (req, res, next) => {
    res.render('apps-kanban', { title: 'Kanban'});
})
route.get('/apps-file-manager', (req, res, next) => {
    res.render('apps-file-manager', { title: 'File Manager'});
})

// Pages
route.get('/pages-profile', (req, res, next) => {
    res.render('pages-profile', { title: 'Profile'});
})
route.get('/pages-invoice', (req, res, next) => {
    res.render('pages-invoice', { title: 'Invoice'});
})
route.get('/pages-faq', (req, res, next) => {
    res.render('pages-faq', { title: 'FAQ'});
})
route.get('/pages-pricing', (req, res, next) => {
    res.render('pages-pricing', { title: 'Pricing'});
})
route.get('/pages-maintenance', (req, res, next) => {
    res.render('pages-maintenance', { title: 'Maintenance', layout: false })
})
route.get('/pages-starter', (req, res, next) => {
    res.render('pages-starter', { title: 'Starter'});
})
route.get('/pages-preloader', (req, res, next) => {
    res.render('pages-preloader', { title: 'Preloader', layout: 'partials/layout-preloader'});
})
route.get('/pages-timeline', (req, res, next) => {
    res.render('pages-timeline', { title: 'timeline'});
})

// Auth Pages
route.get('/auth-login', (req, res, next) => {
    res.render('auth/auth-login', { title: 'Login In', layout: false })
})
route.get('/auth-login-2', (req, res, next) => {
    res.render('auth-login-2', { title: 'Login In', layout: false })
})
route.get('/auth-register', (req, res, next) => {
    res.render('auth/auth-register', { title: 'Register', layout: false })
})
route.get('/auth-register-2', (req, res, next) => {
    res.render('auth-register-2', { title: 'Register', layout: false })
})
route.get('/auth-logout', (req, res, next) => {
    res.render('auth/auth-logout', { title: 'Logout', layout: false })
})
route.get('/auth-logout-2', (req, res, next) => {
    res.render('auth-logout-2', { title: 'Logout', layout: false })
})
route.get('/auth-recoverpw', (req, res, next) => {
    res.render('auth/auth-recoverpw', { title: 'Recover Password', layout: false })
})
route.get('/auth-recoverpw-2', (req, res, next) => {
    res.render('auth-recoverpw-2', { title: 'Recover Password', layout: false })
})
route.get('/lock-screen', (req, res, next) => {
    res.render('lock-screen', { title: 'Lock Screen', layout: false })
})
route.get('/lock-screen-2', (req, res, next) => {
    res.render('lock-screen-2', { title: 'Lock Screen', layout: false })
})
route.get('/auth-confirm-mail', (req, res, next) => {
    res.render('auth-confirm-mail', { title: 'Confirm Mail', layout: false })
})
route.get('/auth-confirm-mail-2', (req, res, next) => {
    res.render('auth-confirm-mail-2', { title: 'Confirm Mail', layout: false })
})

// Error
route.get('/error-404', (req, res, next) => {
    res.render('error-404', { title: 'Error 404', layout: false })
})
route.get('/error-404-alt', (req, res, next) => {
    res.render('error-404-alt', { title: 'Error Page | 404 Alt'})
})
route.get('/error-500', (req, res, next) => {
    res.render('error-500', { title: 'Error Page | 500', layout: false })
})

// Layouts
route.get('/layouts-horizontal', (req, res, next) => {
    res.render('layouts-horizontal', { title: 'Horizontal Layout', layout: 'partials/layout-horizontal'})
})
route.get('/layouts-compact', (req, res, next) => {
    res.render('layouts-compact', { title: 'Layout Compact',layout_mode:'fluid',sidenav:'compact', layout: 'partials/layout-sidenav'})
})
route.get('/layouts-detached', (req, res, next) => {
    res.render('layouts-detached', { title: 'Layout Detached', layout_mode:'detached',sidenav:'default', layout: 'partials/layout-sidenav'})
})
route.get('/layouts-full', (req, res, next) => {
    res.render('layouts-full', { title: 'Layout Full',layout_mode:'fluid',sidenav:'full', layout: 'partials/layout-sidenav'})
})
route.get('/layouts-fullscreen', (req, res, next) => {
    res.render('layouts-fullscreen', { title: 'Layout Fullscreen',layout_mode:'fluid',sidenav:'fullscreen', layout: 'partials/layout-sidenav'})
})
route.get('/layouts-hover', (req, res, next) => {
    res.render('layouts-hover', { title: 'Layout Hover',layout_mode:'fluid',sidenav:'sm-hover', layout: 'partials/layout-sidenav'})
})
route.get('/layouts-icon-view', (req, res, next) => {
    res.render('layouts-icon-view', { title: 'Layout Icon',layout_mode:'fluid',sidenav:'condensed', layout: 'partials/layout-sidenav'})
})

// Ui Kit
route.get('/ui-accordions', (req, res, next) => {
    res.render('ui-accordions', { title: 'Accordions'})
})
route.get('/ui-alerts', (req, res, next) => {
    res.render('ui-alerts', { title: 'Alerts'})
})
route.get('/ui-avatars', (req, res, next) => {
    res.render('ui-avatars', { title: 'Avatars'})
})
route.get('/ui-badges', (req, res, next) => {
    res.render('ui-badges', { title: 'Badges'})
})
route.get('/ui-breadcrumb', (req, res, next) => {
    res.render('ui-breadcrumb', { title: 'Breadcrumb'})
})
route.get('/ui-buttons', (req, res, next) => {
    res.render('ui-buttons', { title: 'Buttons'})
})
route.get('/ui-cards', (req, res, next) => {
    res.render('ui-cards', { title: 'Cards'})
})
route.get('/ui-carousel', (req, res, next) => {
    res.render('ui-carousel', { title: 'Carousel'})
})
route.get('/ui-collapse', (req, res, next) => {
    res.render('ui-collapse', { title: 'Collapse'})
})
route.get('/ui-dropdowns', (req, res, next) => {
    res.render('ui-dropdowns', { title: 'Dropdown'})
})
route.get('/ui-embed-video', (req, res, next) => {
    res.render('ui-embed-video', { title: 'Embed Video'})
})
route.get('/ui-grid', (req, res, next) => {
    res.render('ui-grid', { title: 'Grid System'})
})
route.get('/ui-links', (req, res, next) => {
    res.render('ui-links', { title: 'Links'})
})
route.get('/ui-list-group', (req, res, next) => {
    res.render('ui-list-group', { title: 'List Group'})
})
route.get('/ui-modals', (req, res, next) => {
    res.render('ui-modals', { title: 'Modals'})
})
route.get('/ui-notifications', (req, res, next) => {
    res.render('ui-notifications', { title: 'Notifications'})
})
route.get('/ui-offcanvas', (req, res, next) => {
    res.render('ui-offcanvas', { title: 'Offcanvas'})
})
route.get('/ui-pagination', (req, res, next) => {
    res.render('ui-pagination', { title: 'Pagination'})
})
route.get('/ui-placeholders', (req, res, next) => {
    res.render('ui-placeholders', { title: 'Placeholders'})
})
route.get('/ui-popovers', (req, res, next) => {
    res.render('ui-popovers', { title: 'Popovers'})
})
route.get('/ui-progress', (req, res, next) => {
    res.render('ui-progress', { title: 'Progress'})
})
route.get('/ui-spinners', (req, res, next) => {
    res.render('ui-spinners', { title: 'Spinners'})
})
route.get('/ui-tabs', (req, res, next) => {
    res.render('ui-tabs', { title: 'Tabs'})
})
route.get('/ui-tooltips', (req, res, next) => {
    res.render('ui-tooltips', { title: 'Tooltips'})
})
route.get('/ui-tost', (req, res, next) => {
    res.render('ui-tost', { title: 'Tost'})
})
route.get('/ui-typography', (req, res, next) => {
    res.render('ui-typography', { title: 'Typography'})
})
route.get('/ui-utilities', (req, res, next) => {
    res.render('ui-utilities', { title: 'Utilities'})
})

// Extended UI
route.get('/extended-dragula', (req, res, next) => {
    res.render('extended-dragula', { title: 'Dragula'})
})
route.get('/extended-range-slider', (req, res, next) => {
    res.render('extended-range-slider', { title: 'Range Slider'})
})
route.get('/extended-ratings', (req, res, next) => {
    res.render('extended-ratings', { title: 'Ratings'})
})
route.get('/extended-scrollspy', (req, res, next) => {
    res.render('extended-scrollspy', { title: 'Scrollspy'})
})
route.get('/extended-scrollbar', (req, res, next) => {
    res.render('extended-scrollbar', { title: 'Scrollbar'})
})

// Widgets
route.get('/widgets', (req, res, next) => {
    res.render('widgets', { title: 'Widgets'})
})

// Icons
route.get('/icons-bootstrap', (req, res, next) => {
    res.render('icons-bootstrap', { title: 'Bootstrap Icons'})
})
route.get('/icons-remixicons', (req, res, next) => {
    res.render('icons-remixicons', { title: 'Remix Icons'})
})
route.get('/icons-material-symbol', (req, res, next) => {
    res.render('icons-material-symbol', { title: 'Material Symbol Icons'})
})

// Charts
route.get('/charts-apex-area', (req, res, next) => {
    res.render('charts-apex-area', { title: 'Area Charts'})
})
route.get('/charts-apex-bar', (req, res, next) => {
    res.render('charts-apex-bar', { title: 'Bar Charts'})
})
route.get('/charts-apex-bubble', (req, res, next) => {
    res.render('charts-apex-bubble', { title: 'Bubble Charts'})
})
route.get('/charts-apex-candlestick', (req, res, next) => {
    res.render('charts-apex-candlestick', { title: 'Candlestick Charts'})
})
route.get('/charts-apex-column', (req, res, next) => {
    res.render('charts-apex-column', { title: 'Column Charts'})
})
route.get('/charts-apex-heatmap', (req, res, next) => {
    res.render('charts-apex-heatmap', { title: 'Heatmap Charts'})
})
route.get('/charts-apex-line', (req, res, next) => {
    res.render('charts-apex-line', { title: 'Line Charts'})
})
route.get('/charts-apex-mixed', (req, res, next) => {
    res.render('charts-apex-mixed', { title: 'Mixed Charts'})
})
route.get('/charts-apex-timeline', (req, res, next) => {
    res.render('charts-apex-timeline', { title: 'Timeline Charts'})
})
route.get('/charts-apex-boxplot', (req, res, next) => {
    res.render('charts-apex-boxplot', { title: 'Boxplot Charts'})
})
route.get('/charts-apex-treemap', (req, res, next) => {
    res.render('charts-apex-treemap', { title: 'Treemap Charts'})
})
route.get('/charts-apex-pie', (req, res, next) => {
    res.render('charts-apex-pie', { title: 'Pie Charts'})
})
route.get('/charts-apex-radar', (req, res, next) => {
    res.render('charts-apex-radar', { title: 'Radar Charts'})
})
route.get('/charts-apex-radialbar', (req, res, next) => {
    res.render('charts-apex-radialbar', { title: 'RadialBar Charts'})
})
route.get('/charts-apex-scatter', (req, res, next) => {
    res.render('charts-apex-scatter', { title: 'Scatter Charts'})
})
route.get('/charts-apex-polar-area', (req, res, next) => {
    res.render('charts-apex-polar-area', { title: 'Polar Area Charts'})
})
route.get('/charts-apex-sparklines', (req, res, next) => {
    res.render('charts-apex-sparklines', { title: 'Sparklines Charts'})
})
route.get('/charts-chartjs-area', (req, res, next) => {
    res.render('charts-chartjs-area', { title: 'Chartjs'})
})
route.get('/charts-chartjs-bar', (req, res, next) => {
    res.render('charts-chartjs-bar', { title: 'Chartjs'})
})
route.get('/charts-chartjs-line', (req, res, next) => {
    res.render('charts-chartjs-line', { title: 'Chartjs'})
})
route.get('/charts-chartjs-other', (req, res, next) => {
    res.render('charts-chartjs-other', { title: 'Chartjs'})
})

// Forms
route.get('/form-advanced', (req, res, next) => {
    res.render('form-advanced', { title: 'Form Advanced'})
})
route.get('/form-wizard', (req, res, next) => {
    res.render('form-wizard', { title: 'Form Wizard'})
})
route.get('/form-editors', (req, res, next) => {
    res.render('form-editors', { title: 'Editors'})
})
route.get('/form-validation', (req, res, next) => {
    res.render('form-validation', { title: 'Form Validation'})
})
route.get('/form-elements', (req, res, next) => {
    res.render('form-elements', { title: 'Form Elements'})
})
route.get('/form-fileuploads', (req, res, next) => {
    res.render('form-fileuploads', { title: 'File Uploads'})
})

// Tables
route.get('/tables-basic', (req, res, next) => {
    res.render('tables-basic', { title: 'Bootstrap Basic Tables'})
})
route.get('/tables-datatable', (req, res, next) => {
    res.render('tables-datatable', { title: 'Data Tables'})
})

// Maps
route.get('/maps-google', (req, res, next) => {
    res.render('maps-google', { title: 'Google Maps'})
})
route.get('/maps-vector', (req, res, next) => {
    res.render('maps-vector', { title: 'Vector Maps'})
})