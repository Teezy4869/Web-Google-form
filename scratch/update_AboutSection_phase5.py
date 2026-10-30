import sys

with open('src/components/home/AboutSection.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports
old_import = """import {
  Target,
  Heart,
  Award,
  Users,"""

new_import = """import {
  Target,
  Heart,
  Award,
  Users,
  Zap,"""

if old_import in content:
    content = content.replace(old_import, new_import)
    print("Added Zap to imports in AboutSection.jsx")
else:
    print("ERROR: old_import not found")
    sys.exit(1)

# 2. Update getPillarIcon
old_pillar_icon = """  const getPillarIcon = (id) => {
    switch (id) {
      case 'practical':
        return <Target size={24} className="text-gold" />;
      case 'solidarity':
        return <Heart size={24} className="text-gold" />;
      case 'growth':
        return <Award size={24} className="text-gold" />;
      case 'network':
        return <Users size={24} className="text-gold" />;
      default:
        return <Target size={24} className="text-gold" />;
    }
  };"""

new_pillar_icon = """  const getPillarIcon = (id) => {
    switch (id) {
      case 'respect':
        return <Heart size={24} className="text-gold" />;
      case 'proactive':
        return <Zap size={24} className="text-gold" />;
      case 'responsibility':
        return <Target size={24} className="text-gold" />;
      case 'companionship':
        return <HeartHandshake size={24} className="text-gold" />;
      default:
        return <Sparkles size={24} className="text-gold" />;
    }
  };"""

content_norm = content.replace('\r\n', '\n')
old_pillar_icon_norm = old_pillar_icon.replace('\r\n', '\n')
new_pillar_icon_norm = new_pillar_icon.replace('\r\n', '\n')

if old_pillar_icon_norm in content_norm:
    content_norm = content_norm.replace(old_pillar_icon_norm, new_pillar_icon_norm)
    print("Updated getPillarIcon in AboutSection.jsx")
else:
    print("ERROR: old_pillar_icon not found")
    sys.exit(1)

# 3. Update Section Header, Remove Mission, and Update Core Values Header
old_middle_sections = """        {/* 2. Section Header: Introduction & Overview */}
        <div className="section-header reveal">
          <span className="section-tag">
            <Sparkles size={14} className="text-gold" />
            <span>Về Chúng Tôi · YGC / AEP</span>
          </span>
          <h2 className="section-title">Hành Trình Kiến Tạo & Bứt Phá Giới Hạn</h2>
          <p className="section-desc">
            {CLUB_INFO.description}
          </p>
        </div>

        {/* 3. Mission Spotlight Card */}
        <div className="glass-card mission-spotlight-card reveal" style={{ marginBottom: '5rem' }}>
          <div className="mission-content">
            <span className="badge badge-primary" style={{ marginBottom: '0.85rem' }}>
              Sứ Mệnh Cốt Lõi
            </span>
            <h3 className="mission-title font-display">
              Bệ Phóng Vững Chắc Cho Khát Vọng Tuổi Trẻ
            </h3>
            <p className="mission-text">
              {CLUB_INFO.mission}
            </p>
          </div>
        </div>

        {/* 4. Core Values & 4 Cultural Pillars Grid */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div className="section-header reveal" style={{ marginBottom: '2.75rem' }}>
            <span className="section-tag">
              Giá Trị Cốt Lõi
            </span>
            <h3 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', color: '#ffffff' }}>
              4 Cột Trụ Văn Hóa & Tinh Thần YGC / AEP
            </h3>
          </div>"""

new_middle_sections = """        {/* 2. Section Header: About Us (Customer PDF Page 5) */}
        <div className="section-header reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Sparkles size={14} className="text-gold" />
            <span>About us</span>
          </span>
          <h2 className="section-title">
            GYC - Câu lạc bộ <span className="text-gradient font-display">Thế hệ trẻ AEP</span>
          </h2>
          <p className="about-slogan font-display">
            “Light up your way!”
          </p>
          <p className="section-desc">
            {CLUB_INFO.description}
          </p>
        </div>

        {/* 3. Core Values Grid (Customer PDF Page 6) */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div className="section-header reveal" style={{ marginBottom: '2.75rem' }}>
            <span className="section-tag">
              <Sparkles size={14} className="text-gold" />
              <span>{CLUB_INFO.coreValuesTitle}</span>
            </span>
            <h3 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', color: '#ffffff' }}>
              Những giá trị cốt lõi <span className="text-gradient">GYC - Câu lạc bộ Thế hệ trẻ AEP</span> hướng tới
            </h3>
          </div>"""

old_middle_norm = old_middle_sections.replace('\r\n', '\n')
new_middle_norm = new_middle_sections.replace('\r\n', '\n')

if old_middle_norm in content_norm:
    content_norm = content_norm.replace(old_middle_norm, new_middle_norm)
    print("Updated About Us, removed Mission section, and updated Core Values header in AboutSection.jsx")
else:
    print("ERROR: old_middle_sections not found")
    sys.exit(1)

if '\r\n' in content:
    content = content_norm.replace('\n', '\r\n')
else:
    content = content_norm

with open('src/components/home/AboutSection.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated src/components/home/AboutSection.jsx")

