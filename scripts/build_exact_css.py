import re

with open('onesalon_style.css', 'r', encoding='utf-8') as f:
    style_css = f.read()

with open('onesalon_media.css', 'r', encoding='utf-8') as f:
    media_css = f.read()

# Replace relative image URLs
style_css = style_css.replace('../img/reviews.jpg', '/images/reviews.jpg')
style_css = style_css.replace('../img/bg-asked.png', '/images/bg-asked.png')
style_css = style_css.replace('../img/mask-img.png', '/images/mask-img.png')
style_css = style_css.replace('../img/before-img.png', '/images/before-img.png')
style_css = style_css.replace('../img/drown-icon.png', '/images/drown-icon.png')
style_css = style_css.replace('../img/one-salon-img.png', '/images/one-salon-img.png')

# Fix font-face to use Google Font Montserrat
font_replacements = """@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

body {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 500;
}
"""

style_css = re.sub(r'@font-face\s*\{[^}]+\}', '', style_css)

extra_css = """
/* Extra polish matching review widget & consultation banner */
.virtualconsultation {
  background: black;
  padding: 40px;
  text-align: center;
}
.virtualconsultation h1 {
  color: white;
  text-align: center;
  font-size: 32px;
  font-family: "Montserrat-Bold", 'Montserrat', sans-serif;
  margin-bottom: 20px;
}
.virtualconsultation h1 span {
  color: #C59D5F;
}
.virtualconsultbutton {
  display: inline-block;
  background: #C59D5F;
  color: #000;
  font-family: "Montserrat-Bold", 'Montserrat', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  padding: 14px 32px;
  letter-spacing: 1.5px;
  border: 1px solid #C59D5F;
  transition: all 0.3s ease;
}
.virtualconsultbutton:hover {
  background: transparent;
  color: #FFF;
  border-color: #FFF;
}

/* Reviews layout matching One Salon */
.reviews-container {
  max-width: 1100px;
  margin: 0 auto;
}
.reviews-header-stats {
  text-align: center;
  margin-bottom: 40px;
}
.reviews-rating-number {
  font-size: 48px;
  font-weight: 700;
  color: #FFF;
  line-height: 1;
}
.reviews-stars-row {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin: 12px 0 8px;
  color: #ffbc00;
  font-size: 22px;
}
.reviews-sub-count {
  font-size: 14px;
  color: #BFC3CF;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.reviews-slider-track {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}
@media only screen and (max-width: 996px) {
  .reviews-slider-track {
    grid-template-columns: 1fr;
  }
}
.review-box {
  background: rgba(21, 21, 21, 0.95);
  padding: 30px 25px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
}
.review-box-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.reviewer-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}
.reviewer-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #C59D5F;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}
.reviewer-info h4 {
  color: #FFF;
  font-size: 16px;
  margin: 0;
  font-weight: 600;
}
.reviewer-info span {
  color: #888;
  font-size: 12px;
}
.review-comment {
  color: #E0E0E0;
  font-size: 14px;
  line-height: 1.6;
  font-style: italic;
  margin: 0;
}
"""

combined = font_replacements + "\n" + style_css + "\n" + media_css + "\n" + extra_css

with open('src/styles/onesalon.css', 'w', encoding='utf-8') as out:
    out.write(combined)

print("Saved src/styles/onesalon.css with exact rules, size:", len(combined))
