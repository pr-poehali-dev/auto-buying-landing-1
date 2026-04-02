import { useState } from "react";
import Icon from "@/components/ui/icon";

const CAR_GALLERY = [
  {
    id: 1,
    img: "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/04c0aff8-2f42-40ff-82d2-e11791729492.jpg",
    name: "Mercedes-Benz E200",
    year: "2019",
    price: "2 450 000 ₽",
    days: "за 2 часа",
  },
  {
    id: 2,
    img: "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/c53db136-1114-49bb-a93b-ad672271f683.jpg",
    name: "Toyota Camry 2.5",
    year: "2021",
    price: "1 850 000 ₽",
    days: "за 1 час",
  },
  {
    id: 3,
    img: "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/fe6e5653-14ad-47c7-b5b3-2902b4847d62.jpg",
    name: "BMW 520i",
    year: "2020",
    price: "2 100 000 ₽",
    days: "за 3 часа",
  },
  {
    id: 4,
    img: "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/15d413e4-e50e-433b-91d7-c64cc3c90565.jpg",
    name: "Kia K5",
    year: "2022",
    price: "1 650 000 ₽",
    days: "за 45 мин",
  },
];

const ADVANTAGES = [
  { icon: "Clock", title: "Оценка за 30 минут", desc: "Выезжаем к вам сами или принимаем авто в нашем центре — оценка бесплатно" },
  { icon: "Banknote", title: "Деньги в тот же день", desc: "Наличные или перевод на карту — сразу после подписания договора" },
  { icon: "ShieldCheck", title: "Честная цена", desc: "Оцениваем по рыночным данным без скрытых вычетов и комиссий" },
  { icon: "FileCheck", title: "Все документы за вас", desc: "Снимаем с учёта, оформляем договор — вам ничего не нужно делать" },
  { icon: "Car", title: "Любое состояние", desc: "Битые, кредитные, с пробегом, без ОСАГО — берём любые авто" },
  { icon: "Star", title: "1200+ выкупов в год", desc: "Работаем с 2015 года, более 6000 довольных клиентов по всей России" },
];

const STEPS = [
  { num: "01", title: "Оставьте заявку", desc: "Заполните форму или позвоните — ответим в течение 5 минут" },
  { num: "02", title: "Бесплатный осмотр", desc: "Приедем к вам или встретимся у нашего офиса в удобное время" },
  { num: "03", title: "Получите предложение", desc: "Назовём реальную цену на месте — без скрытых условий" },
  { num: "04", title: "Деньги на руки", desc: "Подпишем договор и сразу передадим деньги — наличные или перевод" },
];

const REVIEWS = [
  { name: "Алексей М.", city: "Москва", text: "Продал Камри за 1.5 часа. Сначала думал, что предложат копейки, но дали реальную рыночную цену. Очень доволен — всё быстро и честно.", stars: 5, car: "Toyota Camry 2020" },
  { name: "Светлана К.", city: "Санкт-Петербург", text: "Авто было в кредите. Менеджер сам разобрался с банком, погасил остаток и отдал мне разницу. Никакого стресса, всё сделали за меня.", stars: 5, car: "Hyundai Sonata 2019" },
  { name: "Дмитрий В.", city: "Казань", text: "Бился с авто после ДТП три месяца. Позвонил сюда — приехали, оценили, забрали на следующий день. Деньги сразу на карту.", stars: 5, car: "Ford Focus 2018" },
];

const FAQ = [
  { q: "Вы выкупаете кредитные автомобили?", a: "Да, мы работаем с кредитными автомобилями. Погашаем остаток долга банку, а разницу отдаём вам на руки в тот же день." },
  { q: "Как быстро получу деньги?", a: "Деньги передаются сразу после подписания договора — наличными или переводом на карту. Обычно процесс занимает 1–3 часа с момента осмотра." },
  { q: "Вы приедете ко мне?", a: "Да, выезжаем в любую точку города и области бесплатно. Также можете приехать к нам — адрес в разделе контактов." },
  { q: "Берёте ли авто в плохом состоянии?", a: "Берём любые автомобили: битые, с высоким пробегом, не на ходу, после ДТП, с проблемными документами. Цена зависит от состояния." },
  { q: "Нужно ли снимать авто с учёта самому?", a: "Нет. Снятие с учёта мы берём на себя — оформляем все документы и уведомляем вас о завершении процедуры." },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", car: "" });

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--dark)" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ backgroundColor: "rgba(248,246,243,0.97)", borderBottom: "1px solid #e8e4df", backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: "var(--red)" }} />
          <span className="font-display text-xl font-bold tracking-widest uppercase" style={{ color: "#111" }}>
            АвтоВыкуп
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "#555" }}>
          <a href="#advantages" className="hover:text-black transition-colors">Преимущества</a>
          <a href="#gallery" className="hover:text-black transition-colors">Галерея</a>
          <a href="#process" className="hover:text-black transition-colors">Процесс</a>
          <a href="#reviews" className="hover:text-black transition-colors">Отзывы</a>
        </div>
        <a href="#contact" className="btn-primary px-5 py-2 text-sm rounded font-display tracking-wider uppercase">
          Оценить авто
        </a>
      </nav>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        style={{ backgroundColor: "#f8f6f3" }}
      >
        {/* Фоновые декоры */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(220,38,38,0.06) 0%, transparent 60%)" }} />
        <div className="absolute top-0 right-0 w-px h-full pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(220,38,38,0.2), transparent)" }} />

        {/* Авто на фоне — правая часть */}
        <div className="absolute right-0 top-0 w-full md:w-3/5 h-full pointer-events-none overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/1f734ad5-9d38-4f5c-b832-9f732a420017.jpg"
            alt="Выкуп авто"
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.18, filter: "grayscale(30%)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #f8f6f3 0%, rgba(248,246,243,0.3) 40%, transparent 100%)" }} />
        </div>

        {/* Вертикальная полоса-акцент */}
        <div className="absolute left-0 top-0 w-1.5 h-full" style={{ backgroundColor: "var(--red)" }} />

        <div className="container-custom relative z-10 py-24">
          <div className="max-w-2xl">
            {/* Бейдж */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-wider mb-10"
              style={{ backgroundColor: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", color: "var(--red)" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--red)" }} />
              Работаем сейчас · Москва и область
            </div>

            {/* Главный оффер по 4U */}
            <h1 className="font-display font-bold leading-tight mb-2" style={{ color: "#111" }}>
              <span className="block text-5xl md:text-7xl tracking-tight" style={{ animation: "fade-up 0.5s ease-out forwards" }}>
                ПОЛУЧИТЕ
              </span>
              <span className="block text-5xl md:text-7xl tracking-tight" style={{ color: "var(--red)", animation: "fade-up 0.5s ease-out 0.1s both" }}>
                НА 15–30%
              </span>
              <span className="block text-5xl md:text-7xl tracking-tight" style={{ animation: "fade-up 0.5s ease-out 0.2s both" }}>
                БОЛЬШЕ,
              </span>
              <span className="block text-4xl md:text-6xl tracking-tight mt-1" style={{ color: "#333", animation: "fade-up 0.5s ease-out 0.3s both" }}>
                чем у перекупщиков
              </span>
            </h1>

            {/* Подзаголовок — уточняющий оффер */}
            <p
              className="text-lg md:text-xl mt-6 mb-4 max-w-xl leading-relaxed font-semibold"
              style={{ color: "#222", animation: "fade-up 0.5s ease-out 0.4s both" }}
            >
              Выкупаем авто за 1–3 часа — деньги на карту до того, как вы уедете домой
            </p>
            <p
              className="text-base mb-10 max-w-lg leading-relaxed"
              style={{ color: "#666", animation: "fade-up 0.5s ease-out 0.5s both" }}
            >
              Бесплатно приедем, оценим по рыночной базе и сразу назовём цену. Кредитные, битые, без документов — берём всё.
            </p>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-4" style={{ animation: "fade-up 0.5s ease-out 0.55s both" }}>
              <a
                href="#contact"
                className="btn-primary px-8 py-4 text-base rounded inline-flex items-center gap-3 justify-center"
              >
                <Icon name="Calculator" size={20} />
                Узнать цену за 5 минут
              </a>
              <a
                href="tel:+78001234567"
                className="px-8 py-4 text-base rounded inline-flex items-center gap-3 justify-center font-display font-semibold tracking-wider uppercase transition-all"
                style={{ border: "2px solid #ddd", color: "#222", backgroundColor: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#222"; }}
              >
                <Icon name="Phone" size={20} />
                8 800 123-45-67
              </a>
            </div>

            {/* 4U-микрооферы под кнопками */}
            <div className="flex flex-col gap-2 mt-8" style={{ animation: "fade-up 0.5s ease-out 0.65s both" }}>
              {[
                { icon: "Zap", text: "Выезд оценщика — бесплатно и в день обращения" },
                { icon: "BadgeCheck", text: "Цена фиксируется письменно — не снизим после осмотра" },
                { icon: "Banknote", text: "Деньги переводим ДО подписания ПТС" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(220,38,38,0.12)" }}>
                    <Icon name={item.icon as "Zap"} size={12} style={{ color: "var(--red)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "#444" }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Статы */}
            <div
              className="flex flex-wrap gap-8 mt-12 pt-10"
              style={{ borderTop: "1px solid #e5e5e5", animation: "fade-up 0.5s ease-out 0.75s both" }}
            >
              {[
                { num: "6 000+", label: "выкупленных авто" },
                { num: "от 30 мин", label: "время оценки" },
                { num: "9 лет", label: "на рынке" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold" style={{ color: "#111" }}>{s.num}</div>
                  <div className="text-sm mt-1" style={{ color: "#888" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="section-pad" style={{ backgroundColor: "var(--dark-2)" }}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="card-dark rounded-lg p-7">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(220,38,38,0.15)" }}>
                  <Icon name={a.icon as "Clock"} size={22} style={{ color: "var(--red-bright)" }} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3 uppercase tracking-wide">{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray-light)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section-pad" style={{ backgroundColor: "var(--dark)" }}>
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="red-line" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
                Последние выкупы
              </h2>
            </div>
            <p className="text-sm" style={{ color: "var(--gray-light)" }}>Реальные авто от реальных продавцов</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAR_GALLERY.map((car) => (
              <div key={car.id} className="card-dark rounded-xl overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-display font-bold text-white" style={{ backgroundColor: "var(--red)" }}>
                    ВЫКУПЛЕНО
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display text-base font-semibold text-white uppercase tracking-wide leading-tight">{car.name}</h4>
                      <p className="text-xs mt-1" style={{ color: "var(--gray-light)" }}>{car.year} год</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-base font-bold" style={{ color: "var(--red-bright)" }}>{car.price}</div>
                      <div className="text-xs mt-1" style={{ color: "var(--gray-light)" }}>{car.days}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section-pad relative overflow-hidden" style={{ backgroundColor: "var(--dark-2)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 70%)" }} />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
              Как это работает
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="number-badge mb-5">{step.num}</div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray-light)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section-pad" style={{ backgroundColor: "var(--dark)" }}>
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
              Что говорят клиенты
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card-dark rounded-xl p-7 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={16} style={{ color: "#facc15", fill: "#facc15" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#ccc" }}>«{r.text}»</p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--gray)" }}>
                  <div>
                    <div className="font-display font-semibold text-white text-sm uppercase tracking-wide">{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--gray-light)" }}>{r.city}</div>
                  </div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "var(--red-bright)", border: "1px solid rgba(220,38,38,0.2)" }}>
                    {r.car}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad" style={{ backgroundColor: "var(--dark-2)" }}>
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: openFaq === i ? "var(--dark-3)" : "var(--dark)", border: `1px solid ${openFaq === i ? "var(--red)" : "var(--gray)"}`, transition: "all 0.2s" }}
              >
                <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display font-semibold text-white uppercase tracking-wide text-sm pr-4">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: openFaq === i ? "var(--red-bright)" : "var(--gray-light)", flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#aaa", borderTop: "1px solid var(--gray)" }}>
                    <p className="pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="section-pad relative overflow-hidden" style={{ backgroundColor: "var(--dark)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.08) 0%, transparent 60%)" }} />
        <div className="container-custom relative z-10 max-w-2xl text-center">
          <span className="red-line-center" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide mb-4">
            Узнайте цену вашего авто
          </h2>
          <p className="mb-10" style={{ color: "var(--gray-light)" }}>
            Оставьте заявку — перезвоним в течение 5 минут и назовём точную сумму
          </p>
          <div className="rounded-2xl p-8 md:p-10 text-left" style={{ backgroundColor: "var(--dark-2)", border: "1px solid var(--gray)" }}>
            <div className="space-y-5">
              {[
                { label: "Ваше имя", placeholder: "Иван Иванов", key: "name", type: "text" },
                { label: "Телефон", placeholder: "+7 (999) 000-00-00", key: "phone", type: "tel" },
                { label: "Ваш автомобиль", placeholder: "Марка, модель, год", key: "car", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2 text-white">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-colors"
                    style={{ border: "1px solid var(--gray)", backgroundColor: "var(--dark)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--red)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gray)")}
                  />
                </div>
              ))}
              <button className="btn-primary w-full py-4 rounded-lg text-base inline-flex items-center justify-center gap-3 mt-2">
                <Icon name="Send" size={20} />
                Получить оценку
              </button>
            </div>
            <p className="text-center text-xs mt-5" style={{ color: "var(--gray-light)" }}>
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="py-14" style={{ backgroundColor: "var(--dark-2)", borderTop: "1px solid var(--gray)" }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: "var(--red)" }} />
                <span className="font-display text-xl font-bold tracking-widest uppercase text-white">АвтоВыкуп</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--gray-light)" }}>
                Выкуп автомобилей дорого и быстро. Работаем с 2015 года. Честные цены, никаких скрытых комиссий.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold uppercase tracking-wider text-white mb-5 text-sm">Контакты</h4>
              <div className="space-y-3">
                {[
                  { icon: "Phone", text: "8 800 123-45-67 (бесплатно)" },
                  { icon: "MessageCircle", text: "WhatsApp / Telegram" },
                  { icon: "MapPin", text: "Москва, ул. Автомобильная, 15" },
                  { icon: "Clock", text: "Пн–Вс: 8:00 — 22:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon name={c.icon as "Phone"} size={16} style={{ color: "var(--red-bright)" }} />
                    <span className="text-sm" style={{ color: "var(--gray-light)" }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold uppercase tracking-wider text-white mb-5 text-sm">Быстрая оценка</h4>
              <p className="text-sm mb-5" style={{ color: "var(--gray-light)" }}>
                Позвоните прямо сейчас и узнайте стоимость вашего авто
              </p>
              <a href="tel:+78001234567" className="btn-primary px-6 py-3 rounded inline-flex items-center gap-2 text-sm">
                <Icon name="Phone" size={16} />
                Позвонить
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs" style={{ borderTop: "1px solid var(--gray)", color: "var(--gray-light)" }}>
            <p>© 2025 АвтоВыкуп. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}