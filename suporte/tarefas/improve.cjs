const fs = require('fs');
let html = fs.readFileSync('tarefas.html', 'utf8');
function replace(a,b) { if (!html.includes(a)) throw Error('Missing: '+a.slice(0,80)); html=html.replace(a,b); }
replace('</style>', `
        /* Interface de acompanhamento */
        :root { --text:#253247; --muted:#66758a; --line:#e3e8ef; --black:#182234; --radius:14px; }
        body { background:#f3f5f8; }
        .ambient-bg,.hero::after,.stat-card::after,.table-card::before,.result-count::before { display:none; }
        .hero,.filters-card,.stats-grid,.table-card,tbody tr { animation:none; }
        .app-shell { width:min(1640px,calc(100% - 64px)); padding-top:32px; }
        .hero { background:#182234; border-radius:16px; box-shadow:none; padding:28px 30px; }
        .hero-copy p { color:#b9c4d4; }
        .hero-pill { border-radius:8px; color:#fbd1ad; }
        .filters-card,.table-card,.stat-card { box-shadow:0 2px 5px #18223404; background:#fff; }
        .section-heading { margin:0 0 16px; font-size:.95rem; font-weight:700; }
        .section-heading small { display:block; margin-top:5px; font-size:.8rem; color:var(--muted); font-weight:400; }
        .field label { text-transform:none; letter-spacing:0; font-weight:650; color:#526078; }
        .field input,.field select { border-radius:8px; border-color:#dbe1e9; height:42px; }
        .primary-btn { border-radius:8px; height:42px; background:#c95b00; box-shadow:none; }
        .quick-periods { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:14px; color:var(--muted); font-size:.78rem; }
        .quick-periods button,.clear-btn { border:1px solid var(--line); border-radius:6px; background:white; color:#526078; padding:7px 12px; cursor:pointer; }
        .quick-periods button:hover,.clear-btn:hover { background:var(--orange-soft); color:#974700; }
        .stat-card { border-radius:12px; cursor:pointer; border-top:3px solid #8190a5; }
        .stat-card.finalizadas { border-top-color:var(--success); }
        .stat-card.pendentes { border-top-color:var(--warning); }
        .stat-card.execucao { border-top-color:var(--info); }
        .stat-card.reprovadas { border-top-color:var(--danger); }
        .stat-card[aria-pressed="true"] { outline:2px solid #c95b00; outline-offset:2px; }
        .stat-label { font-weight:650; letter-spacing:0; text-transform:none; color:#526078; }
        .stat-value { font-weight:750; font-variant-numeric:tabular-nums; }
        .stat-sub { color:#66758a; font-weight:400; }
        .stat-meter { height:4px; margin-top:15px; background:#edf1f5; border-radius:4px; overflow:hidden; }
        .stat-meter span { display:block; height:100%; background:var(--meter-color,#8190a5); width:0; transition:width .2s; }
        .local-filters { display:grid; grid-template-columns:2fr 1fr 1fr auto; gap:12px; align-items:end; padding:18px 20px; border-bottom:1px solid var(--line); background:#fbfcfe; }
        .local-filters:disabled { opacity:.55; }
        fieldset.local-filters { margin:0; border:0; border-bottom:1px solid var(--line); min-width:0; }
        .clear-btn { height:42px; }
        .table-toolbar { flex-wrap:wrap; }
        .table-wrap { max-height:650px; }
        table { min-width:1350px; }
        thead th { background:#f5f7fa; color:#526078; font-weight:650; font-size:.7rem; }
        tbody td { padding:16px 14px; font-size:.82rem; border-color:#edf0f4; }
        tbody tr:nth-child(even) { background:#fcfdff; }
        tbody tr:hover { background:#fff8f1; }
        .resource-name { min-width:140px; max-width:240px; overflow-wrap:anywhere; color:#34445d; font-weight:600; }
        .unit-name { overflow-wrap:anywhere; }
        .link-btn { background:#f2f5f9; color:#34445d; border-color:#e3e8ef; }
        .result-count { background:#f0f3f7; color:#526078; }
        :focus-visible { outline:3px solid #c95b00; outline-offset:3px; }
        @media(max-width:1000px) { .local-filters { grid-template-columns:1fr 1fr; } }
        @media(max-width:620px) { .app-shell { width:calc(100% - 24px); padding-top:12px; } .local-filters { grid-template-columns:1fr; } .hero { padding:20px; } .stats-grid .total { grid-column:1 / -1; } }
        @media(prefers-reduced-motion:reduce) { *,*::before,*::after { animation:none!important; transition:none!important; scroll-behavior:auto!important; } }
    </style>`);
replace('Constellation API · V1.1','Painel de acompanhamento');
replace('<form id="searchForm"', '<h2 class="section-heading">Consultar histórico<small>Selecione o usuário e o período para carregar as tarefas.</small></h2>\n            <form id="searchForm"');
replace('</form>', `</form><div class="quick-periods"><span>Período rápido:</span><button type="button" data-days="0">Hoje</button><button type="button" data-days="6">Últimos 7 dias</button><button type="button" data-days="29">Últimos 30 dias</button><button type="button" data-days="month">Este mês</button></div>`);
replace('<div id="loadingState"', `<fieldset id="localFilters" class="local-filters" disabled aria-label="Filtros dos resultados">
                <div class="field"><label for="textFilter">Buscar nas tarefas</label><input id="textFilter" type="search" placeholder="ID, descrição, unidade ou recurso…" /></div>
                <div class="field"><label for="resourceFilter">Recurso</label><select id="resourceFilter"><option value="">Todos os recursos</option></select></div>
                <div class="field"><label for="statusFilter">Situação</label><select id="statusFilter"><option value="">Todas as situações</option><option value="finalizada">Finalizadas</option><option value="pendente">Pendentes</option><option value="execucao">Em execução</option><option value="reprovada">Reprovadas</option><option value="neutra">Outras situações</option></select></div>
                <button id="clearFilters" class="clear-btn" type="button">Limpar filtros</button>
            </fieldset>
            <div id="loadingState" role="status"`);
replace('<div id="errorState"','<div role="alert" id="errorState"');
replace('<th>Situação</th>','<th class="sortable" data-sort-key="nom_recurso" aria-sort="none"><span class="sort-label">Recurso <span class="sort-indicator">↕</span></span></th>\n                            <th>Situação</th>');
replace('<td><span class="status ${statusClass', '<td><div class="resource-name">${escapeHtml(task.nom_recurso || \'Não informado\')}</div></td>\n          <td><span class="status ${statusClass');
replace('let currentTasks = [];', `let currentTasks = [];
        let allTasks = [];
        let hasLoaded = false;
        const textFilter = document.getElementById('textFilter');
        const resourceFilter = document.getElementById('resourceFilter');
        const statusFilter = document.getElementById('statusFilter');
        const localFilters = document.getElementById('localFilters');
        const normalize = value => String(value ?? '').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLocaleLowerCase('pt-BR');
        function applyFilters() {
            if (!hasLoaded) return;
            const query = normalize(textFilter.value.trim());
            const base = allTasks.filter(task => (!resourceFilter.value || String(task.nom_recurso || 'Não informado') === resourceFilter.value) && (!query || normalize([task.id_tarefa, task.nom_unid_oper, task.nom_recurso, task.fkid_unid_negoc, task.cod_unid_oper, htmlToText(task.titulo_tarefa || '')].join(' ')).includes(query)));
            renderTasks(base.filter(task => !statusFilter.value || statusClass(task.des_sit_tarefa || '') === statusFilter.value));
            updateStats(base);
            resultCount.textContent = currentTasks.length + ' de ' + allTasks.length + ' tarefas';
            document.querySelectorAll('.stat-card').forEach((card,index) => card.setAttribute('aria-pressed', String(statusFilter.value === ['', 'finalizada', 'pendente', 'execucao', 'reprovada'][index])));
        }
        textFilter.addEventListener('input', applyFilters);
        resourceFilter.addEventListener('change', applyFilters);
        statusFilter.addEventListener('change', applyFilters);
        document.getElementById('clearFilters').addEventListener('click', () => { textFilter.value=''; resourceFilter.value=''; statusFilter.value=''; applyFilters(); });
        document.querySelectorAll('[data-days]').forEach(button => button.addEventListener('click', () => {
            const end = new Date(); const start = new Date();
            if (button.dataset.days === 'month') start.setDate(1); else start.setDate(start.getDate() - Number(button.dataset.days));
            dataInicio.value = toDateInputValue(start); dataFim.value = toDateInputValue(end);
        }));
        document.querySelectorAll('.stat-card').forEach((card,index) => {
            card.tabIndex=0; card.setAttribute('role','button'); card.setAttribute('aria-pressed','false');
            card.title='Filtrar por ' + card.querySelector('.stat-label').textContent;
            const meter=document.createElement('div'); meter.className='stat-meter'; meter.setAttribute('aria-hidden','true'); meter.innerHTML='<span></span>'; card.appendChild(meter);
            meter.style.setProperty('--meter-color',['#8190a5','var(--success)','var(--warning)','var(--info)','var(--danger)'][index]);
            card.addEventListener('click', () => { if (localFilters.disabled) return; const value=['','finalizada','pendente','execucao','reprovada'][index]; statusFilter.value=statusFilter.value === value ? '' : value; applyFilters(); });
            card.addEventListener('keydown', event => { if(event.key==='Enter'||event.key===' ') { event.preventDefault(); card.click(); } });
        });`);
replace('statTotal.textContent = total;', `document.querySelectorAll('.stat-meter span').forEach((meter,index) => { meter.style.width = (index === 0 ? (total ? 100 : 0) : percent([total,counts.finalizadas,counts.pendentes,counts.execucao,counts.reprovadas][index])) + '%'; });
            statTotal.textContent = total;`);
replace('renderTasks(tasks);', `allTasks = tasks.filter(task => task && typeof task === 'object');
                hasLoaded = true;
                const selectedResource = resourceFilter.value;
                resourceFilter.replaceChildren(new Option('Todos os recursos', ''));
                [...new Set(allTasks.map(task => String(task.nom_recurso || 'Não informado')))].sort((a,b) => a.localeCompare(b,'pt-BR')).forEach(name => resourceFilter.add(new Option(name,name)));
                if ([...resourceFilter.options].some(option => option.value === selectedResource)) resourceFilter.value = selectedResource;
                localFilters.disabled = false;
                applyFilters();`);
replace("searchBtn.disabled = true;", "localFilters.disabled = true;\n            hideGlobalDatePopover();\n            searchBtn.disabled = true;");
replace("console.error(error);", "console.error(error);\n                allTasks = []; currentTasks = []; hasLoaded = false; updateStats([]);");
fs.writeFileSync('tarefas.html',html);
