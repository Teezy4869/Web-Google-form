import sys

with open('src/components/home/GalaSection.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports
old_imports = """  Flame,
  HeartHandshake,
  Rocket
} from 'lucide-react';"""

new_imports = """  Users,
  Crown
} from 'lucide-react';"""

if old_imports in content:
    content = content.replace(old_imports, new_imports)
    print("Updated imports in GalaSection.jsx")
else:
    print("WARNING: old_imports not found directly, checking variations")

# 2. Add getTimelineIcon resolver
timeline_func = """  const getTimelineIcon = (id) => {
    switch (id) {
      case 'teambuilding':
        return <Users size={20} className="text-gold" />;
      case 'king_queen':
        return <Crown size={20} className="text-gold" />;
      case 'gala_night':
        return <Sparkles size={20} className="text-gold" />;
      default:
        return <Calendar size={20} className="text-gold" />;
    }
  };

  const timeDisplay = GALA_EVENT.schedule.dateTime;"""

target_time_display = "  const timeDisplay = GALA_EVENT.schedule.dateTime;"

if target_time_display in content:
    content = content.replace(target_time_display, timeline_func)
    print("Added getTimelineIcon function to GalaSection.jsx")
else:
    print("ERROR: target_time_display not found")
    sys.exit(1)

# 3. Replace 3 meaning cards with 3 timeline milestones
old_pillars = """              {/* 3 Meaning Core Pillars */}
              <div className="meaning-values-grid">
                <div className="meaning-value-item">
                  <div className="meaning-value-icon">
                    <Flame size={20} className="text-gold" />
                  </div>
                  <div className="meaning-value-content">
                    <h4 className="meaning-value-title">Thắp Lửa Đam Mê</h4>
                    <p className="meaning-value-text">
                      Khơi dậy nguồn cảm hứng sáng tạo và khát vọng dấn thân mãnh liệt của thế hệ trẻ công nghệ & truyền thông.
                    </p>
                  </div>
                </div>

                <div className="meaning-value-item">
                  <div className="meaning-value-icon">
                    <HeartHandshake size={20} className="text-gold" />
                  </div>
                  <div className="meaning-value-content">
                    <h4 className="meaning-value-title">Gắn Kết Thế Hệ</h4>
                    <p className="meaning-value-text">
                      Tri ân những cống hiến của thế hệ tiền bối, thắt chặt tinh thần đoàn kết bền chặt của đại gia đình YGC / AEP.
                    </p>
                  </div>
                </div>

                <div className="meaning-value-item">
                  <div className="meaning-value-icon">
                    <Rocket size={20} className="text-gold" />
                  </div>
                  <div className="meaning-value-content">
                    <h4 className="meaning-value-title">Bứt Phá Giới Hạn</h4>
                    <p className="meaning-value-text">
                      Mở ra chương mới đầy triển vọng, cùng nhau kiến tạo những giá trị tích cực và vươn tới tầm cao mới.
                    </p>
                  </div>
                </div>
              </div>"""

new_timeline = """              {/* Official Event Timeline (Customer PDF Page 4) */}
              <div className="meaning-values-grid timeline-values-grid" aria-label="Lộ trình sự kiện">
                {GALA_EVENT.timeline.map((item) => (
                  <div key={item.id} className="meaning-value-item timeline-value-item">
                    <div className="meaning-value-icon timeline-value-icon">
                      {getTimelineIcon(item.id)}
                    </div>
                    <div className="meaning-value-content">
                      <h4 className="meaning-value-title timeline-value-title">{item.title}</h4>
                      <div className="timeline-date-badge">
                        <Calendar size={13} className="text-gold" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>"""

# Replace with normalized newlines
content_norm = content.replace('\r\n', '\n')
old_pillars_norm = old_pillars.replace('\r\n', '\n')
new_timeline_norm = new_timeline.replace('\r\n', '\n')

if old_pillars_norm in content_norm:
    content_norm = content_norm.replace(old_pillars_norm, new_timeline_norm)
    if '\r\n' in content:
        content = content_norm.replace('\n', '\r\n')
    else:
        content = content_norm
    with open('src/components/home/GalaSection.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated GalaSection.jsx with Event Timeline")
else:
    print("ERROR: old_pillars not found in GalaSection.jsx")
    sys.exit(1)
