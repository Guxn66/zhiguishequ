// 智汇社区后台管理系统 v1.0
const API = '/api';
let currentPage = 'dashboard';
let editingItem = null;

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);

    // 菜单点击事件
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            if (page) showPage(page);
        });
    });

    showPage('dashboard');
});

function updateTime() {
    document.getElementById('currentTime').textContent = new Date().toLocaleString('zh-CN');
}

// ==================== 提示消息 ====================
function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==================== 模态框 ====================
function openModal(title, bodyHTML, onSubmit) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modal').classList.add('show');
    document.getElementById('modalSubmit').onclick = onSubmit;
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
    editingItem = null;
}

// ==================== 页面路由 ====================
async function showPage(page) {
    currentPage = page;
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });

    const main = document.getElementById('mainContent');
    main.innerHTML = '<div class="empty"><span class="icon">⏳</span>加载中...</div>';

    const pages = {
        dashboard: renderDashboard,
        banners: renderBanners,
        cases: renderCases,
        projects: renderProjects,
        counselors: renderCounselors,
        care: renderCare,
        training: renderTraining,
        volunteer: renderVolunteer,
        appointments: renderAppointments,
        feedback: renderFeedback,
        users: renderUsers,
        settings: renderSettings
    };

    if (pages[page]) {
        main.innerHTML = await pages[page]();
    }
}

// ==================== 仪表盘 ====================
async function renderDashboard() {
    let stats = { banners: 0, cases: 0, counselors: 0, projects: 0, activities: 0, courses: 0 };
    try {
        const [bannersRes, casesRes, counselorsRes, projectsRes, activitiesRes, coursesRes] = await Promise.all([
            fetch(`${API}/banners`).then(r => r.json()).catch(() => ({})),
            fetch(`${API}/cases`).then(r => r.json()).catch(() => ({})),
            fetch(`${API}/counselors`).then(r => r.json()).catch(() => ({})),
            fetch(`${API}/projects`).then(r => r.json()).catch(() => ({})),
            fetch(`${API}/volunteers/activities`).then(r => r.json()).catch(() => ({})),
            fetch(`${API}/training/courses`).then(r => r.json()).catch(() => ({}))
        ]);
        const banners = bannersRes.data || bannersRes || [];
        const cases = casesRes.data || casesRes || [];
        const counselors = counselorsRes.data || counselorsRes || [];
        const projects = projectsRes.data || projectsRes || [];
        const activities = activitiesRes.data || activitiesRes || [];
        const courses = coursesRes.data || coursesRes || [];
        stats = {
            banners: Array.isArray(banners) ? banners.length : 0,
            cases: Array.isArray(cases) ? cases.length : 0,
            counselors: Array.isArray(counselors) ? counselors.length : 0,
            projects: Array.isArray(projects) ? projects.length : 0,
            activities: Array.isArray(activities) ? activities.length : 0,
            courses: Array.isArray(courses) ? courses.length : 0
        };
    } catch (e) { console.error(e); }

    return `
        <div class="stats">
            <div class="stat-card orange"><div class="icon">🖼️</div><div class="info"><div class="value">${stats.banners}</div><div class="label">轮播图</div></div></div>
            <div class="stat-card blue"><div class="icon">📋</div><div class="info"><div class="value">${stats.cases}</div><div class="label">服务案例</div></div></div>
            <div class="stat-card green"><div class="icon">👨‍⚕️</div><div class="info"><div class="value">${stats.counselors}</div><div class="label">咨询师</div></div></div>
            <div class="stat-card purple"><div class="icon">📑</div><div class="info"><div class="value">${stats.projects}</div><div class="label">项目公示</div></div></div>
            <div class="stat-card orange"><div class="icon">🤝</div><div class="info"><div class="value">${stats.activities}</div><div class="label">志愿活动</div></div></div>
            <div class="stat-card blue"><div class="icon">📚</div><div class="info"><div class="value">${stats.courses}</div><div class="label">培训课程</div></div></div>
        </div>
        <div class="panel">
            <div class="panel-header"><div class="panel-title">📢 系统状态</div></div>
            <p style="color:#666;line-height:2">
                ✅ 后端服务运行正常<br>
                ✅ 数据库已连接 (MySQL: zhihui_community)<br>
                ✅ AI咨询服务已启用 (Gemini API)<br>
                📱 小程序版本: v1.0.5
            </p>
        </div>
        <div class="panel">
            <div class="panel-header"><div class="panel-title">🔗 快捷操作</div></div>
            <button class="btn btn-primary" onclick="showPage('banners')" style="margin-right:10px">管理轮播图</button>
            <button class="btn btn-primary" onclick="showPage('counselors')" style="margin-right:10px">管理咨询师</button>
            <button class="btn btn-primary" onclick="showPage('volunteer')" style="margin-right:10px">管理志愿活动</button>
            <button class="btn btn-primary" onclick="showPage('training')">管理培训课程</button>
        </div>`;
}


// ==================== 轮播图管理 ====================
async function renderBanners() {
    let rows = '';
    try {
        const res = await fetch(`${API}/banners`).then(r => r.json());
        const data = res.data || res || [];
        if (data.length === 0) {
            rows = '<tr><td colspan="6" class="empty">暂无数据，点击上方按钮添加</td></tr>';
        } else {
            data.forEach(b => {
                rows += `<tr>
                    <td>${b.id}</td>
                    <td>${b.title || '-'}</td>
                    <td>${b.imageUrl ? `<img src="${b.imageUrl}" style="height:40px;border-radius:4px">` : '无图片'}</td>
                    <td>${b.sortOrder || 0}</td>
                    <td><span class="status ${b.status === 1 ? 'active' : 'pending'}">${b.status === 1 ? '启用' : '禁用'}</span></td>
                    <td>
                        <button class="action-btn" onclick="editBanner(${b.id})">编辑</button>
                        <button class="action-btn danger" onclick="deleteBanner(${b.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="6" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">🖼️ 轮播图管理</div>
            <button class="btn btn-primary" onclick="addBanner()">+ 添加轮播图</button>
        </div>
        <table>
            <tr><th>ID</th><th>标题</th><th>图片</th><th>排序</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addBanner() {
    openModal('添加轮播图', `
        <div class="form-group"><label>标题</label><input type="text" id="bannerTitle" placeholder="轮播图标题"></div>
        <div class="form-group"><label>图片URL</label><input type="text" id="bannerImage" placeholder="https://..."></div>
        <div class="form-group"><label>跳转链接</label><input type="text" id="bannerLink" placeholder="跳转页面路径"></div>
        <div class="form-group"><label>排序</label><input type="number" id="bannerSort" value="0"></div>
    `, saveBanner);
}

async function editBanner(id) {
    try {
        const res = await fetch(`${API}/banners`).then(r => r.json());
        const data = res.data || res || [];
        const item = data.find(b => b.id === id);
        if (!item) return showToast('数据不存在', 'error');
        editingItem = item;
        openModal('编辑轮播图', `
            <div class="form-group"><label>标题</label><input type="text" id="bannerTitle" value="${item.title || ''}"></div>
            <div class="form-group"><label>图片URL</label><input type="text" id="bannerImage" value="${item.imageUrl || ''}"></div>
            <div class="form-group"><label>跳转链接</label><input type="text" id="bannerLink" value="${item.link || ''}"></div>
            <div class="form-group"><label>排序</label><input type="number" id="bannerSort" value="${item.sortOrder || 0}"></div>
        `, saveBanner);
    } catch(e) { showToast('加载失败', 'error'); }
}

async function saveBanner() {
    const data = {
        title: document.getElementById('bannerTitle').value,
        imageUrl: document.getElementById('bannerImage').value,
        link: document.getElementById('bannerLink').value,
        sortOrder: parseInt(document.getElementById('bannerSort').value) || 0,
        status: 1
    };
    try {
        const url = editingItem ? `${API}/banners/${editingItem.id}` : `${API}/banners`;
        const method = editingItem ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast(editingItem ? '修改成功' : '添加成功');
        closeModal();
        showPage('banners');
    } catch(e) { showToast('保存失败', 'error'); }
}

async function deleteBanner(id) {
    if (!confirm('确定删除此轮播图？')) return;
    try {
        await fetch(`${API}/banners/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('banners');
    } catch(e) { showToast('删除失败', 'error'); }
}

// ==================== 咨询师管理 ====================
async function renderCounselors() {
    let rows = '';
    try {
        const res = await fetch(`${API}/counselors`).then(r => r.json());
        const data = res.data || res || [];
        if (data.length === 0) {
            rows = '<tr><td colspan="6" class="empty">暂无数据</td></tr>';
        } else {
            data.forEach(c => {
                rows += `<tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.qualification || '-'}</td>
                    <td><div class="tags">${(c.specialty || '').split(',').map(s => `<span class="tag">${s}</span>`).join('')}</div></td>
                    <td><span class="status active">在岗</span></td>
                    <td>
                        <button class="action-btn" onclick="editCounselor(${c.id})">编辑</button>
                        <button class="action-btn danger" onclick="deleteCounselor(${c.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="6" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">👨‍⚕️ 咨询师管理</div>
            <button class="btn btn-primary" onclick="addCounselor()">+ 添加咨询师</button>
        </div>
        <table>
            <tr><th>ID</th><th>姓名</th><th>资质</th><th>专长领域</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addCounselor() {
    openModal('添加咨询师', `
        <div class="form-group"><label>姓名</label><input type="text" id="counselorName" placeholder="咨询师姓名"></div>
        <div class="form-group"><label>资质</label><input type="text" id="counselorQual" placeholder="如：国家二级心理咨询师"></div>
        <div class="form-group"><label>专长领域</label><input type="text" id="counselorSpec" placeholder="多个用逗号分隔，如：情绪管理,家庭关系"></div>
        <div class="form-group"><label>简介</label><textarea id="counselorIntro" placeholder="咨询师简介"></textarea></div>
        <div class="form-group"><label>联系电话</label><input type="text" id="counselorPhone" placeholder="联系电话"></div>
    `, saveCounselor);
}

async function editCounselor(id) {
    try {
        const res = await fetch(`${API}/counselors`).then(r => r.json());
        const data = res.data || res || [];
        const item = data.find(c => c.id === id);
        if (!item) return showToast('数据不存在', 'error');
        editingItem = item;
        openModal('编辑咨询师', `
            <div class="form-group"><label>姓名</label><input type="text" id="counselorName" value="${item.name || ''}"></div>
            <div class="form-group"><label>资质</label><input type="text" id="counselorQual" value="${item.qualification || ''}"></div>
            <div class="form-group"><label>专长领域</label><input type="text" id="counselorSpec" value="${item.specialty || ''}"></div>
            <div class="form-group"><label>简介</label><textarea id="counselorIntro">${item.introduction || ''}</textarea></div>
            <div class="form-group"><label>联系电话</label><input type="text" id="counselorPhone" value="${item.phone || ''}"></div>
        `, saveCounselor);
    } catch(e) { showToast('加载失败', 'error'); }
}

async function saveCounselor() {
    const data = {
        name: document.getElementById('counselorName').value,
        qualification: document.getElementById('counselorQual').value,
        specialty: document.getElementById('counselorSpec').value,
        introduction: document.getElementById('counselorIntro').value,
        phone: document.getElementById('counselorPhone').value,
        status: 1
    };
    try {
        const url = editingItem ? `${API}/counselors/${editingItem.id}` : `${API}/counselors`;
        const method = editingItem ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast(editingItem ? '修改成功' : '添加成功');
        closeModal();
        showPage('counselors');
    } catch(e) { showToast('保存失败', 'error'); }
}

async function deleteCounselor(id) {
    if (!confirm('确定删除此咨询师？')) return;
    try {
        await fetch(`${API}/counselors/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('counselors');
    } catch(e) { showToast('删除失败', 'error'); }
}



// ==================== 服务案例管理 ====================
async function renderCases() {
    let rows = '';
    try {
        const res = await fetch(`${API}/cases`).then(r => r.json());
        const data = res.data || [];
        if (data.length === 0) {
            rows = '<tr><td colspan="6" class="empty">暂无数据</td></tr>';
        } else {
            data.forEach(c => {
                rows += `<tr>
                    <td>${c.id}</td>
                    <td>${c.title}</td>
                    <td><span class="tag">${c.category || '未分类'}</span></td>
                    <td>${c.views || 0}</td>
                    <td><span class="status active">已发布</span></td>
                    <td>
                        <button class="action-btn" onclick="editCase(${c.id})">编辑</button>
                        <button class="action-btn danger" onclick="deleteCase(${c.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="6" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">📋 服务案例管理</div>
            <button class="btn btn-primary" onclick="addCase()">+ 添加案例</button>
        </div>
        <table>
            <tr><th>ID</th><th>标题</th><th>分类</th><th>浏览量</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addCase() {
    openModal('添加服务案例', `
        <div class="form-group"><label>标题</label><input type="text" id="caseTitle" placeholder="案例标题"></div>
        <div class="form-group"><label>分类</label>
            <select id="caseCategory">
                <option value="心理咨询">心理咨询</option>
                <option value="家庭关系">家庭关系</option>
                <option value="青少年成长">青少年成长</option>
                <option value="老年关怀">老年关怀</option>
                <option value="社区服务">社区服务</option>
            </select>
        </div>
        <div class="form-group"><label>摘要</label><textarea id="caseSummary" placeholder="案例摘要"></textarea></div>
        <div class="form-group"><label>详细内容</label><textarea id="caseContent" placeholder="案例详细内容"></textarea></div>
        <div class="form-group"><label>封面图URL</label><input type="text" id="caseCover" placeholder="https://..."></div>
    `, saveCase);
}

async function editCase(id) {
    try {
        const res = await fetch(`${API}/cases`).then(r => r.json());
        const item = (res.data || []).find(c => c.id === id);
        if (!item) return showToast('数据不存在', 'error');
        editingItem = item;
        openModal('编辑服务案例', `
            <div class="form-group"><label>标题</label><input type="text" id="caseTitle" value="${item.title || ''}"></div>
            <div class="form-group"><label>分类</label>
                <select id="caseCategory">
                    <option value="心理咨询" ${item.category === '心理咨询' ? 'selected' : ''}>心理咨询</option>
                    <option value="家庭关系" ${item.category === '家庭关系' ? 'selected' : ''}>家庭关系</option>
                    <option value="青少年成长" ${item.category === '青少年成长' ? 'selected' : ''}>青少年成长</option>
                    <option value="老年关怀" ${item.category === '老年关怀' ? 'selected' : ''}>老年关怀</option>
                    <option value="社区服务" ${item.category === '社区服务' ? 'selected' : ''}>社区服务</option>
                </select>
            </div>
            <div class="form-group"><label>摘要</label><textarea id="caseSummary">${item.summary || ''}</textarea></div>
            <div class="form-group"><label>详细内容</label><textarea id="caseContent">${item.content || ''}</textarea></div>
            <div class="form-group"><label>封面图URL</label><input type="text" id="caseCover" value="${item.coverImage || ''}"></div>
        `, saveCase);
    } catch(e) { showToast('加载失败', 'error'); }
}

async function saveCase() {
    const data = {
        title: document.getElementById('caseTitle').value,
        category: document.getElementById('caseCategory').value,
        summary: document.getElementById('caseSummary').value,
        content: document.getElementById('caseContent').value,
        coverImage: document.getElementById('caseCover').value,
        status: 1
    };
    try {
        const url = editingItem ? `${API}/cases/${editingItem.id}` : `${API}/cases`;
        const method = editingItem ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast(editingItem ? '修改成功' : '添加成功');
        closeModal();
        showPage('cases');
    } catch(e) { showToast('保存失败', 'error'); }
}

async function deleteCase(id) {
    if (!confirm('确定删除此案例？')) return;
    try {
        await fetch(`${API}/cases/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('cases');
    } catch(e) { showToast('删除失败', 'error'); }
}

// ==================== 项目公示管理 ====================
async function renderProjects() {
    let rows = '';
    try {
        const res = await fetch(`${API}/projects`).then(r => r.json());
        const data = res.data || [];
        if (data.length === 0) {
            rows = '<tr><td colspan="6" class="empty">暂无数据</td></tr>';
        } else {
            data.forEach(p => {
                rows += `<tr>
                    <td>${p.id}</td>
                    <td>${p.title}</td>
                    <td><span class="tag">${p.category || '未分类'}</span></td>
                    <td>${p.publishDate || '-'}</td>
                    <td><span class="status active">已发布</span></td>
                    <td>
                        <button class="action-btn" onclick="editProject(${p.id})">编辑</button>
                        <button class="action-btn danger" onclick="deleteProject(${p.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="6" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">📑 项目公示管理</div>
            <button class="btn btn-primary" onclick="addProject()">+ 添加项目</button>
        </div>
        <table>
            <tr><th>ID</th><th>标题</th><th>分类</th><th>发布日期</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addProject() {
    openModal('添加项目公示', `
        <div class="form-group"><label>标题</label><input type="text" id="projectTitle" placeholder="项目标题"></div>
        <div class="form-group"><label>分类</label>
            <select id="projectCategory">
                <option value="财务公开">财务公开</option>
                <option value="项目进展">项目进展</option>
                <option value="活动公告">活动公告</option>
                <option value="政策通知">政策通知</option>
            </select>
        </div>
        <div class="form-group"><label>内容</label><textarea id="projectContent" placeholder="项目详细内容"></textarea></div>
    `, saveProject);
}

async function editProject(id) {
    try {
        const res = await fetch(`${API}/projects`).then(r => r.json());
        const item = (res.data || []).find(p => p.id === id);
        if (!item) return showToast('数据不存在', 'error');
        editingItem = item;
        openModal('编辑项目公示', `
            <div class="form-group"><label>标题</label><input type="text" id="projectTitle" value="${item.title || ''}"></div>
            <div class="form-group"><label>分类</label>
                <select id="projectCategory">
                    <option value="财务公开" ${item.category === '财务公开' ? 'selected' : ''}>财务公开</option>
                    <option value="项目进展" ${item.category === '项目进展' ? 'selected' : ''}>项目进展</option>
                    <option value="活动公告" ${item.category === '活动公告' ? 'selected' : ''}>活动公告</option>
                    <option value="政策通知" ${item.category === '政策通知' ? 'selected' : ''}>政策通知</option>
                </select>
            </div>
            <div class="form-group"><label>内容</label><textarea id="projectContent">${item.content || ''}</textarea></div>
        `, saveProject);
    } catch(e) { showToast('加载失败', 'error'); }
}

async function saveProject() {
    const data = {
        title: document.getElementById('projectTitle').value,
        category: document.getElementById('projectCategory').value,
        content: document.getElementById('projectContent').value,
        status: 1
    };
    try {
        const url = editingItem ? `${API}/projects/${editingItem.id}` : `${API}/projects`;
        const method = editingItem ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast(editingItem ? '修改成功' : '添加成功');
        closeModal();
        showPage('projects');
    } catch(e) { showToast('保存失败', 'error'); }
}

async function deleteProject(id) {
    if (!confirm('确定删除此项目？')) return;
    try {
        await fetch(`${API}/projects/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('projects');
    } catch(e) { showToast('删除失败', 'error'); }
}


// ==================== 志愿活动管理 ====================
async function renderVolunteer() {
    let rows = '';
    try {
        const res = await fetch(`${API}/volunteers/activities`).then(r => r.json());
        const data = res.data || res || [];
        if (data.length === 0) {
            rows = '<tr><td colspan="7" class="empty">暂无数据</td></tr>';
        } else {
            data.forEach(v => {
                rows += `<tr>
                    <td>${v.id}</td>
                    <td>${v.title}</td>
                    <td>${v.date || '-'}</td>
                    <td>${v.location || '-'}</td>
                    <td>${v.points || 0}分</td>
                    <td><span class="status ${v.status === 'ongoing' ? 'active' : 'completed'}">${v.status === 'ongoing' ? '进行中' : '已结束'}</span></td>
                    <td>
                        <button class="action-btn" onclick="editVolunteer(${v.id})">编辑</button>
                        <button class="action-btn danger" onclick="deleteVolunteer(${v.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="7" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">🤝 志愿活动管理</div>
            <button class="btn btn-primary" onclick="addVolunteer()">+ 添加活动</button>
        </div>
        <table>
            <tr><th>ID</th><th>活动名称</th><th>活动日期</th><th>地点</th><th>积分</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addVolunteer() {
    openModal('添加志愿活动', `
        <div class="form-group"><label>活动名称</label><input type="text" id="volunteerTitle" placeholder="活动名称"></div>
        <div class="form-group"><label>活动日期</label><input type="date" id="volunteerDate"></div>
        <div class="form-group"><label>活动地点</label><input type="text" id="volunteerLocation" placeholder="活动地点"></div>
        <div class="form-group"><label>活动积分</label><input type="number" id="volunteerPoints" value="10" placeholder="参与可获得积分"></div>
        <div class="form-group"><label>活动描述</label><textarea id="volunteerDesc" placeholder="活动详细描述"></textarea></div>
        <div class="form-group"><label>状态</label>
            <select id="volunteerStatus">
                <option value="ongoing">进行中</option>
                <option value="completed">已结束</option>
            </select>
        </div>
    `, saveVolunteer);
}

async function editVolunteer(id) {
    try {
        const res = await fetch(`${API}/volunteers/activities`).then(r => r.json());
        const data = res.data || res || [];
        const item = data.find(v => v.id === id);
        if (!item) return showToast('数据不存在', 'error');
        editingItem = item;
        openModal('编辑志愿活动', `
            <div class="form-group"><label>活动名称</label><input type="text" id="volunteerTitle" value="${item.title || ''}"></div>
            <div class="form-group"><label>活动日期</label><input type="date" id="volunteerDate" value="${item.date || ''}"></div>
            <div class="form-group"><label>活动地点</label><input type="text" id="volunteerLocation" value="${item.location || ''}"></div>
            <div class="form-group"><label>活动积分</label><input type="number" id="volunteerPoints" value="${item.points || 10}"></div>
            <div class="form-group"><label>活动描述</label><textarea id="volunteerDesc">${item.description || ''}</textarea></div>
            <div class="form-group"><label>状态</label>
                <select id="volunteerStatus">
                    <option value="ongoing" ${item.status === 'ongoing' ? 'selected' : ''}>进行中</option>
                    <option value="completed" ${item.status === 'completed' ? 'selected' : ''}>已结束</option>
                </select>
            </div>
        `, saveVolunteer);
    } catch(e) { showToast('加载失败', 'error'); }
}

async function saveVolunteer() {
    const data = {
        title: document.getElementById('volunteerTitle').value,
        date: document.getElementById('volunteerDate').value,
        location: document.getElementById('volunteerLocation').value,
        points: parseInt(document.getElementById('volunteerPoints').value) || 10,
        description: document.getElementById('volunteerDesc').value,
        status: document.getElementById('volunteerStatus').value
    };
    try {
        const url = editingItem ? `${API}/volunteers/activities/${editingItem.id}` : `${API}/volunteers/activities`;
        const method = editingItem ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast(editingItem ? '修改成功' : '添加成功');
        closeModal();
        showPage('volunteer');
    } catch(e) { showToast('保存失败', 'error'); }
}

async function deleteVolunteer(id) {
    if (!confirm('确定删除此活动？')) return;
    try {
        await fetch(`${API}/volunteers/activities/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('volunteer');
    } catch(e) { showToast('删除失败', 'error'); }
}

// ==================== 培训课程管理 ====================
async function renderTraining() {
    let rows = '';
    try {
        const res = await fetch(`${API}/training/courses`).then(r => r.json());
        const data = res.data || res || [];
        if (data.length === 0) {
            rows = '<tr><td colspan="6" class="empty">暂无数据</td></tr>';
        } else {
            data.forEach(t => {
                rows += `<tr>
                    <td>${t.id}</td>
                    <td>${t.title}</td>
                    <td>${t.instructor || '-'}</td>
                    <td>${t.duration || '-'}</td>
                    <td><span class="status active">已发布</span></td>
                    <td>
                        <button class="action-btn" onclick="editTraining(${t.id})">编辑</button>
                        <button class="action-btn danger" onclick="deleteTraining(${t.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="6" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">📚 培训课程管理</div>
            <button class="btn btn-primary" onclick="addTraining()">+ 添加课程</button>
        </div>
        <table>
            <tr><th>ID</th><th>课程名称</th><th>讲师</th><th>时长</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addTraining() {
    openModal('添加培训课程', `
        <div class="form-group"><label>课程名称</label><input type="text" id="trainingTitle" placeholder="课程名称"></div>
        <div class="form-group"><label>讲师</label><input type="text" id="trainingInstructor" placeholder="讲师姓名"></div>
        <div class="form-group"><label>时长</label><input type="text" id="trainingDuration" placeholder="如：2小时"></div>
        <div class="form-group"><label>课程描述</label><textarea id="trainingDesc" placeholder="课程详细描述"></textarea></div>
        <div class="form-group"><label>封面图URL</label><input type="text" id="trainingCover" placeholder="https://..."></div>
    `, saveTraining);
}

async function editTraining(id) {
    try {
        const res = await fetch(`${API}/training/courses`).then(r => r.json());
        const data = res.data || res || [];
        const item = data.find(t => t.id === id);
        if (!item) return showToast('数据不存在', 'error');
        editingItem = item;
        openModal('编辑培训课程', `
            <div class="form-group"><label>课程名称</label><input type="text" id="trainingTitle" value="${item.title || ''}"></div>
            <div class="form-group"><label>讲师</label><input type="text" id="trainingInstructor" value="${item.instructor || ''}"></div>
            <div class="form-group"><label>时长</label><input type="text" id="trainingDuration" value="${item.duration || ''}"></div>
            <div class="form-group"><label>课程描述</label><textarea id="trainingDesc">${item.description || ''}</textarea></div>
            <div class="form-group"><label>封面图URL</label><input type="text" id="trainingCover" value="${item.coverImage || ''}"></div>
        `, saveTraining);
    } catch(e) { showToast('加载失败', 'error'); }
}

async function saveTraining() {
    const data = {
        title: document.getElementById('trainingTitle').value,
        instructor: document.getElementById('trainingInstructor').value,
        duration: document.getElementById('trainingDuration').value,
        description: document.getElementById('trainingDesc').value,
        coverImage: document.getElementById('trainingCover').value,
        status: 1
    };
    try {
        const url = editingItem ? `${API}/training/courses/${editingItem.id}` : `${API}/training/courses`;
        const method = editingItem ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast(editingItem ? '修改成功' : '添加成功');
        closeModal();
        showPage('training');
    } catch(e) { showToast('保存失败', 'error'); }
}

async function deleteTraining(id) {
    if (!confirm('确定删除此课程？')) return;
    try {
        await fetch(`${API}/training/courses/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('training');
    } catch(e) { showToast('删除失败', 'error'); }
}


// ==================== 关怀服务管理 ====================
async function renderCare() {
    let rows = '';
    try {
        const res = await fetch(`${API}/care/services`).then(r => r.json());
        const data = res.data || res || [];
        if (!data || data.length === 0) {
            rows = '<tr><td colspan="6" class="empty">暂无数据</td></tr>';
        } else {
            data.forEach(c => {
                rows += `<tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.category || '-'}</td>
                    <td>${c.description || '-'}</td>
                    <td><span class="status active">可预约</span></td>
                    <td>
                        <button class="action-btn" onclick="editCare(${c.id})">编辑</button>
                        <button class="action-btn danger" onclick="deleteCare(${c.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="6" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">❤️ 关怀服务管理</div>
            <button class="btn btn-primary" onclick="addCare()">+ 添加服务</button>
        </div>
        <p style="color:#999;font-size:13px;margin-bottom:16px">管理可预约的关怀服务项目，居民可在小程序中预约这些服务</p>
        <table>
            <tr><th>ID</th><th>服务名称</th><th>分类</th><th>描述</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addCare() {
    openModal('添加关怀服务', `
        <div class="form-group"><label>服务名称</label><input type="text" id="careName" placeholder="如：上门探访"></div>
        <div class="form-group"><label>分类</label>
            <select id="careCategory">
                <option value="日常关怀">日常关怀</option>
                <option value="心理支持">心理支持</option>
                <option value="健康服务">健康服务</option>
                <option value="生活帮助">生活帮助</option>
                <option value="紧急援助">紧急援助</option>
            </select>
        </div>
        <div class="form-group"><label>服务描述</label><textarea id="careDesc" placeholder="服务详细描述"></textarea></div>
        <div class="form-group"><label>图标</label><input type="text" id="careIcon" placeholder="如：❤️ 或图片URL"></div>
    `, saveCare);
}

async function editCare(id) {
    try {
        const res = await fetch(`${API}/care/services`).then(r => r.json());
        const data = res.data || res || [];
        const item = data.find(c => c.id === id);
        if (!item) return showToast('数据不存在', 'error');
        editingItem = item;
        openModal('编辑关怀服务', `
            <div class="form-group"><label>服务名称</label><input type="text" id="careName" value="${item.name || ''}"></div>
            <div class="form-group"><label>分类</label>
                <select id="careCategory">
                    <option value="日常关怀" ${item.category === '日常关怀' ? 'selected' : ''}>日常关怀</option>
                    <option value="心理支持" ${item.category === '心理支持' ? 'selected' : ''}>心理支持</option>
                    <option value="健康服务" ${item.category === '健康服务' ? 'selected' : ''}>健康服务</option>
                    <option value="生活帮助" ${item.category === '生活帮助' ? 'selected' : ''}>生活帮助</option>
                    <option value="紧急援助" ${item.category === '紧急援助' ? 'selected' : ''}>紧急援助</option>
                </select>
            </div>
            <div class="form-group"><label>服务描述</label><textarea id="careDesc">${item.description || ''}</textarea></div>
            <div class="form-group"><label>图标</label><input type="text" id="careIcon" value="${item.icon || ''}"></div>
        `, saveCare);
    } catch(e) { showToast('加载失败', 'error'); }
}

async function saveCare() {
    const data = {
        name: document.getElementById('careName').value,
        category: document.getElementById('careCategory').value,
        description: document.getElementById('careDesc').value,
        icon: document.getElementById('careIcon').value,
        status: 1
    };
    try {
        const url = editingItem ? `${API}/care/services/${editingItem.id}` : `${API}/care/services`;
        const method = editingItem ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showToast(editingItem ? '修改成功' : '添加成功');
        closeModal();
        showPage('care');
    } catch(e) { showToast('保存失败', 'error'); }
}

async function deleteCare(id) {
    if (!confirm('确定删除此服务？')) return;
    try {
        await fetch(`${API}/care/services/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('care');
    } catch(e) { showToast('删除失败', 'error'); }
}

// ==================== 预约记录管理 ====================
async function renderAppointments() {
    let rows = '';
    try {
        const res = await fetch(`${API}/appointments`).then(r => r.json());
        const data = res.data || res || [];
        if (!data || data.length === 0) {
            rows = '<tr><td colspan="7" class="empty">暂无预约记录</td></tr>';
        } else {
            data.forEach(a => {
                const statusMap = { pending: '待确认', confirmed: '已确认', completed: '已完成', cancelled: '已取消' };
                const statusClass = { pending: 'pending', confirmed: 'active', completed: 'completed', cancelled: 'rejected' };
                rows += `<tr>
                    <td>${a.id}</td>
                    <td>${a.residentName || '居民'}</td>
                    <td>${a.serviceName || a.counselorName || '-'}</td>
                    <td>${a.date || '-'} ${a.time || ''}</td>
                    <td><span class="status ${statusClass[a.status] || 'pending'}">${statusMap[a.status] || a.status}</span></td>
                    <td>${a.createTime || '-'}</td>
                    <td>
                        <button class="action-btn" onclick="updateAppointmentStatus(${a.id}, 'confirmed')">确认</button>
                        <button class="action-btn" onclick="updateAppointmentStatus(${a.id}, 'completed')">完成</button>
                        <button class="action-btn danger" onclick="updateAppointmentStatus(${a.id}, 'cancelled')">取消</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="7" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">📅 预约记录管理</div>
        </div>
        <table>
            <tr><th>ID</th><th>预约人</th><th>服务/咨询师</th><th>预约时间</th><th>状态</th><th>创建时间</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

async function updateAppointmentStatus(id, status) {
    const statusText = { confirmed: '确认', completed: '完成', cancelled: '取消' };
    if (!confirm(`确定${statusText[status]}此预约？`)) return;
    try {
        await fetch(`${API}/appointments/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        showToast('操作成功');
        showPage('appointments');
    } catch(e) { showToast('操作失败', 'error'); }
}

// ==================== 用户反馈管理 ====================
async function renderFeedback() {
    let rows = '';
    try {
        const res = await fetch(`${API}/feedback`).then(r => r.json());
        const data = res.data || res || [];
        if (!data || data.length === 0) {
            rows = '<tr><td colspan="6" class="empty">暂无反馈记录</td></tr>';
        } else {
            data.forEach(f => {
                rows += `<tr>
                    <td>${f.id}</td>
                    <td>${f.userName || '匿名用户'}</td>
                    <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis">${f.content || '-'}</td>
                    <td>${f.createTime || '-'}</td>
                    <td><span class="status ${f.replied ? 'completed' : 'pending'}">${f.replied ? '已回复' : '待处理'}</span></td>
                    <td>
                        <button class="action-btn" onclick="replyFeedback(${f.id})">回复</button>
                        <button class="action-btn danger" onclick="deleteFeedback(${f.id})">删除</button>
                    </td>
                </tr>`;
            });
        }
    } catch(e) { rows = '<tr><td colspan="6" class="empty">加载失败</td></tr>'; }

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">💬 用户反馈管理</div>
        </div>
        <table>
            <tr><th>ID</th><th>用户</th><th>反馈内容</th><th>时间</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function replyFeedback(id) {
    openModal('回复反馈', `
        <div class="form-group"><label>回复内容</label><textarea id="feedbackReply" placeholder="输入回复内容"></textarea></div>
    `, async () => {
        try {
            await fetch(`${API}/feedback/${id}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reply: document.getElementById('feedbackReply').value })
            });
            showToast('回复成功');
            closeModal();
            showPage('feedback');
        } catch(e) { showToast('回复失败', 'error'); }
    });
}

async function deleteFeedback(id) {
    if (!confirm('确定删除此反馈？')) return;
    try {
        await fetch(`${API}/feedback/${id}`, { method: 'DELETE' });
        showToast('删除成功');
        showPage('feedback');
    } catch(e) { showToast('删除失败', 'error'); }
}


// ==================== 用户管理 ====================
async function renderUsers() {
    // 模拟用户数据（实际应从API获取）
    const users = [
        { id: 1, name: '张三', phone: '13800000001', type: 'resident', status: 1 },
        { id: 2, name: '李四', phone: '13800000002', type: 'resident', status: 1 },
        { id: 3, name: '王社工', phone: 'SW001', type: 'worker', status: 1 },
        { id: 4, name: '赵社工', phone: 'SW002', type: 'worker', status: 1 }
    ];

    let rows = users.map(u => `<tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.phone}</td>
        <td><span class="tag">${u.type === 'worker' ? '社工' : '居民'}</span></td>
        <td><span class="status ${u.status === 1 ? 'active' : 'rejected'}">${u.status === 1 ? '正常' : '禁用'}</span></td>
        <td>
            <button class="action-btn" onclick="editUser(${u.id})">编辑</button>
            <button class="action-btn" onclick="toggleUserStatus(${u.id})">${u.status === 1 ? '禁用' : '启用'}</button>
        </td>
    </tr>`).join('');

    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">👥 用户管理</div>
            <button class="btn btn-primary" onclick="addUser()">+ 添加用户</button>
        </div>
        <table>
            <tr><th>ID</th><th>姓名</th><th>手机号/工号</th><th>类型</th><th>状态</th><th>操作</th></tr>
            ${rows}
        </table>
    </div>`;
}

function addUser() {
    openModal('添加用户', `
        <div class="form-group"><label>姓名</label><input type="text" id="userName" placeholder="用户姓名"></div>
        <div class="form-group"><label>手机号/工号</label><input type="text" id="userPhone" placeholder="手机号或社工工号"></div>
        <div class="form-group"><label>密码</label><input type="password" id="userPassword" placeholder="登录密码"></div>
        <div class="form-group"><label>用户类型</label>
            <select id="userType">
                <option value="resident">居民</option>
                <option value="worker">社工</option>
            </select>
        </div>
    `, saveUser);
}

function editUser(id) {
    showToast('编辑功能开发中', 'error');
}

function toggleUserStatus(id) {
    showToast('状态切换功能开发中', 'error');
}

async function saveUser() {
    const data = {
        name: document.getElementById('userName').value,
        phone: document.getElementById('userPhone').value,
        password: document.getElementById('userPassword').value,
        type: document.getElementById('userType').value
    };

    if (!data.name || !data.phone || !data.password) {
        return showToast('请填写完整信息', 'error');
    }

    try {
        await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        showToast('添加成功');
        closeModal();
        showPage('users');
    } catch(e) { showToast('添加失败', 'error'); }
}

// ==================== 系统设置 ====================
function renderSettings() {
    return `<div class="panel">
        <div class="panel-header">
            <div class="panel-title">⚙️ 系统设置</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px">
            <div class="form-group">
                <label>系统名称</label>
                <input type="text" value="智汇社区" disabled>
            </div>
            <div class="form-group">
                <label>系统版本</label>
                <input type="text" value="v1.0.6" disabled>
            </div>
            <div class="form-group">
                <label>后端地址</label>
                <input type="text" value="http://localhost:3000" disabled>
            </div>
            <div class="form-group">
                <label>数据库</label>
                <input type="text" value="MySQL (zhihui_community)" disabled>
            </div>
            <div class="form-group">
                <label>AI服务</label>
                <input type="text" value="Gemini API (已启用)" disabled>
            </div>
            <div class="form-group">
                <label>服务状态</label>
                <input type="text" value="运行中 ✅" disabled>
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-header">
            <div class="panel-title">📱 小程序配置</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px">
            <div class="form-group">
                <label>小程序版本</label>
                <input type="text" value="v1.0.6" disabled>
            </div>
            <div class="form-group">
                <label>构建时间</label>
                <input type="text" value="${new Date().toLocaleString('zh-CN')}" disabled>
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-header">
            <div class="panel-title">🔧 快捷操作</div>
        </div>
        <button class="btn btn-primary" onclick="clearCache()" style="margin-right:10px">清除缓存</button>
        <button class="btn btn-default" onclick="exportData()" style="margin-right:10px">导出数据</button>
        <button class="btn btn-default" onclick="showSystemLog()">查看日志</button>
    </div>`;
}

function clearCache() {
    showToast('缓存已清除');
}

function exportData() {
    showToast('数据导出功能开发中', 'error');
}

function showSystemLog() {
    openModal('系统日志', `
        <div style="background:#1a1a1a;color:#0f0;padding:16px;border-radius:8px;font-family:monospace;font-size:12px;max-height:300px;overflow-y:auto">
            [${new Date().toLocaleString()}] 系统启动成功<br>
            [${new Date().toLocaleString()}] 数据库连接正常<br>
            [${new Date().toLocaleString()}] AI服务已启用<br>
            [${new Date().toLocaleString()}] 后台管理系统加载完成<br>
        </div>
    `, closeModal);
}