with open('docs/revision/open-questions.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Update Q2 status
old_q2 = """| **Q2** | **Official Fanpage URL** | Customer text specifies: *"Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP"* | Exact URL path to Facebook Page (e.g., `https://www.facebook.com/gyc.aep.neu...`). Existing code points to generic `https://facebook.com`. | **Medium**: Users clicking Fanpage button in Footer and RegisterPage are directed to Facebook homepage rather than club page. | Request official Fanpage URL from customer. Temporarily retain placeholder or use designated official handle if confirmed. |"""

new_q2 = """| **Q2** | **Official Fanpage URL** | Customer text specifies: *"Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP"* | Exact URL path to Facebook Page (e.g., `https://www.facebook.com/gyc.aep.neu...`). Codebase currently preserves safe fallback `https://facebook.com`. | **Low**: Label updated to official title. Clicking navigates to Facebook safely with `rel="noopener noreferrer"`. | Display label verified. Request exact page vanity handle/URL if customer wants direct routing to their page. |"""

# Update Q5 status
old_q5 = """| **Q5** | **Removed Sections — Layout Continuity** | Pages 5 & 7 explicitly note *"Bỏ"* for "Sứ Mệnh Cốt Lõi" and "Lĩnh Vực Hoạt Động". | Does the customer want any visual element (photo gallery, brand badge) to balance the About Us section, or keep it concise (Stats -> About Intro -> Core Values)? | **Low**: Removing both large sections significantly shortens the About section, which makes the landing page leaner and faster. | Remove both sections as instructed and ensure smooth CSS margin/padding transitions between Stats, About Intro, and Core Values. |"""

new_q5 = """| **Q5** | **Removed Sections — Layout Continuity** | Pages 5 & 7 explicitly note *"Bỏ"* for "Sứ Mệnh Cốt Lõi" and "Lĩnh Vực Hoạt Động". | Both sections have been cleanly purged in Phases 5 & 6. Spacing between Stats, About Intro, Core Values, and Bridging CTA is balanced. | **RESOLVED**: Both sections completely removed. Page performance improved and bundle size reduced by ~2.6 kB. | No further action required. |"""

content = content.replace(old_q2, new_q2)
content = content.replace(old_q5, new_q5)

with open('docs/revision/open-questions.md', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated open-questions.md for Phase 6")

