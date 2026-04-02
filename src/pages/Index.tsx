import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// --- Данные ---
const CAR_GALLERY = [
  {
    id: 1,
    imgs: [
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/04c0aff8-2f42-40ff-82d2-e11791729492.jpg",
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/86239969-06b6-4258-8df1-86c33d1364a6.jpg",
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/8c025251-7885-4345-b281-e547943e461b.jpg",
    ],
    name: "Mercedes-Benz E200",
    year: 2019,
    price: "2 450 000 ₽",
    mileage: "68 000 км",
    condition: "Хорошее",
    time: "за 2 часа",
    color: "Чёрный",
    engine: "2.0 турбо, 197 л.с.",
  },
  {
    id: 2,
    imgs: [
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/c53db136-1114-49bb-a93b-ad672271f683.jpg",
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/7bb5ecfd-90e9-4e75-83ee-d4e09fbb9f2f.jpg",
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/f0dd83cf-3107-4243-9f84-3806b1a5d773.jpg",
    ],
    name: "Toyota Camry 2.5",
    year: 2021,
    price: "1 850 000 ₽",
    mileage: "41 000 км",
    condition: "Отличное",
    time: "за 1 час",
    color: "Красный",
    engine: "2.5, 181 л.с.",
  },
  {
    id: 3,
    imgs: [
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/fe6e5653-14ad-47c7-b5b3-2902b4847d62.jpg",
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/48be40c8-a655-4289-9564-5a6b1be24754.jpg",
    ],
    name: "BMW 520i",
    year: 2020,
    price: "2 100 000 ₽",
    mileage: "55 000 км",
    condition: "Хорошее",
    time: "за 3 часа",
    color: "Серебристый",
    engine: "2.0 турбо, 184 л.с.",
  },
  {
    id: 4,
    imgs: [
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/15d413e4-e50e-433b-91d7-c64cc3c90565.jpg",
      "https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/5896635c-dca5-4c0d-92c3-80b5de710834.jpg",
    ],
    name: "Kia K5",
    year: 2022,
    price: "1 650 000 ₽",
    mileage: "28 000 км",
    condition: "Отличное",
    time: "за 45 мин",
    color: "Белый",
    engine: "2.0, 150 л.с.",
  },
];

const ADVANTAGES = [
  { icon: "Clock", title: "Оценка за 30 минут", desc: "Выезжаем к вам сами или принимаем в нашем центре — оценка бесплатно" },
  { icon: "Banknote", title: "Деньги в тот же день", desc: "Наличные или перевод на карту — сразу после подписания договора" },
  { icon: "ShieldCheck", title: "Честная цена", desc: "Оцениваем по рыночным данным без скрытых вычетов и комиссий" },
  { icon: "FileCheck", title: "Все документы за вас", desc: "Снимаем с учёта, оформляем договор — вам ничего не нужно делать" },
  { icon: "Car", title: "Любое состояние", desc: "Битые, кредитные, с пробегом, без ОСАГО — берём любые авто" },
  { icon: "Star", title: "1200+ выкупов в год", desc: "Работаем с 2015 года, более 6000 довольных клиентов" },
];

const STEPS = [
  { num: "01", title: "Оставьте заявку", desc: "Форма или звонок — ответим в течение 5 минут" },
  { num: "02", title: "Бесплатный осмотр", desc: "Приедем к вам или встретимся у нашего офиса" },
  { num: "03", title: "Получите предложение", desc: "Реальная цена на месте — без скрытых условий" },
  { num: "04", title: "Деньги на руки", desc: "Подписываем договор и сразу передаём деньги" },
];

const REVIEWS = [
  { name: "Алексей М.", city: "Москва", text: "Продал Камри за 1.5 часа. Сначала думал, что предложат копейки, но дали реальную рыночную цену. Очень доволен — всё быстро и честно.", stars: 5, car: "Toyota Camry 2020" },
  { name: "Светлана К.", city: "Санкт-Петербург", text: "Авто было в кредите. Менеджер сам разобрался с банком, погасил остаток и отдал мне разницу. Никакого стресса, всё сделали за меня.", stars: 5, car: "Hyundai Sonata 2019" },
  { name: "Дмитрий В.", city: "Казань", text: "Бился с авто после ДТП три месяца. Позвонил сюда — приехали, оценили, забрали на следующий день. Деньги сразу на карту.", stars: 5, car: "Ford Focus 2018" },
];

const FAQ = [
  { q: "Вы выкупаете кредитные автомобили?", a: "Да, мы работаем с кредитными автомобилями. Погашаем остаток долга банку, а разницу отдаём вам на руки в тот же день." },
  { q: "Как быстро получу деньги?", a: "Деньги передаются сразу после подписания договора — наличными или переводом на карту. Обычно 1–3 часа с момента осмотра." },
  { q: "Вы приедете ко мне?", a: "Да, выезжаем в любую точку города и области бесплатно. Также можете приехать к нам — адрес в разделе контактов." },
  { q: "Берёте ли авто в плохом состоянии?", a: "Берём любые автомобили: битые, с высоким пробегом, не на ходу, после ДТП, с проблемными документами." },
  { q: "Нужно ли снимать авто с учёта самому?", a: "Нет. Снятие с учёта мы берём на себя — оформляем все документы и уведомляем вас о завершении." },
];

// --- Базовые цены для расчёта ---
const BASE_PRICES: Record<string, number> = {
  "toyota": 1_800_000, "kia": 1_400_000, "hyundai": 1_350_000, "bmw": 2_200_000,
  "mercedes": 2_500_000, "audi": 2_100_000, "volkswagen": 1_600_000, "skoda": 1_200_000,
  "lada": 700_000, "renault": 1_100_000, "nissan": 1_300_000, "mazda": 1_500_000,
  "honda": 1_600_000, "ford": 1_200_000, "chevrolet": 1_100_000, "lexus": 3_000_000,
  "другое": 1_000_000,
};

function calcPrice(brand: string, year: number, mileage: number, condition: string) {
  const base = BASE_PRICES[brand.toLowerCase()] ?? 1_200_000;
  const currentYear = 2025;
  const age = currentYear - year;
  const ageFactor = Math.max(0.3, 1 - age * 0.06);
  const mileageFactor = Math.max(0.6, 1 - (mileage / 1000) * 0.002);
  const conditionMap: Record<string, number> = { "отличное": 1.0, "хорошее": 0.9, "удовлетворительное": 0.75, "битое": 0.5 };
  const condFactor = conditionMap[condition] ?? 0.85;
  const raw = base * ageFactor * mileageFactor * condFactor;
  const low = Math.round(raw * 0.92 / 10000) * 10000;
  const high = Math.round(raw * 1.05 / 10000) * 10000;
  return { low, high };
}

function formatMoney(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

// --- Компоненты ---

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const start = displayed;
    const end = value;
    if (start === end) return;
    const duration = 600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span>{formatMoney(displayed)}</span>;
}

type CarType = typeof CAR_GALLERY[0];

function CarModal({ car, onClose }: { car: CarType; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#fff", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(220,38,38,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.08)")}
        >
          <Icon name="X" size={18} style={{ color: "#333" }} />
        </button>

        {/* Главное фото */}
        <div className="relative bg-gray-100" style={{ height: "320px" }}>
          <img
            src={car.imgs[activeImg]}
            alt={car.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex gap-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}>
            {car.imgs.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="w-14 h-10 rounded overflow-hidden border-2 transition-all flex-shrink-0"
                style={{ borderColor: activeImg === i ? "var(--red)" : "rgba(255,255,255,0.4)" }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {car.imgs.length > 1 && (
            <>
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                onClick={() => setActiveImg((activeImg - 1 + car.imgs.length) % car.imgs.length)}
              >
                <Icon name="ChevronLeft" size={18} style={{ color: "#333" }} />
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                onClick={() => setActiveImg((activeImg + 1) % car.imgs.length)}
              >
                <Icon name="ChevronRight" size={18} style={{ color: "#333" }} />
              </button>
            </>
          )}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-display font-bold text-white" style={{ backgroundColor: "var(--red)" }}>
            ВЫКУПЛЕНО
          </div>
        </div>

        {/* Инфо */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide" style={{ color: "#111" }}>{car.name}</h3>
              <p className="text-sm mt-1" style={{ color: "#888" }}>{car.year} год · {car.mileage}</p>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl font-bold" style={{ color: "var(--red)" }}>{car.price}</div>
              <div className="text-sm mt-1 font-semibold" style={{ color: "#22c55e" }}>Выкуплено {car.time}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Состояние", val: car.condition },
              { label: "Цвет", val: car.color },
              { label: "Двигатель", val: car.engine },
              { label: "Пробег", val: car.mileage },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-4" style={{ backgroundColor: "#f8f6f3" }}>
                <div className="text-xs mb-1 font-medium uppercase tracking-wide" style={{ color: "#999" }}>{item.label}</div>
                <div className="font-semibold text-sm" style={{ color: "#222" }}>{item.val}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)" }}>
            <Icon name="Info" size={18} style={{ color: "var(--red)", flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "#444" }}>
              Хотите продать похожий автомобиль? Оставьте заявку — оценим и выкупим в тот же день.
            </p>
          </div>

          <a href="#contact" onClick={onClose} className="btn-primary mt-5 w-full py-3 rounded-xl inline-flex items-center justify-center gap-2 text-base">
            <Icon name="Calculator" size={18} />
            Узнать цену моего авто
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Главная страница ---
export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", car: "" });
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  // Форма расчёта
  const [calc, setCalc] = useState({ brand: "toyota", year: 2020, mileage: 80, condition: "хорошее" });
  const [priceResult, setPriceResult] = useState<{ low: number; high: number } | null>(null);
  const [calcDone, setCalcDone] = useState(false);

  useEffect(() => {
    if (calcDone) {
      const r = calcPrice(calc.brand, calc.year, calc.mileage * 1000, calc.condition);
      setPriceResult(r);
    }
  }, [calc, calcDone]);

  const handleCalc = () => {
    const r = calcPrice(calc.brand, calc.year, calc.mileage * 1000, calc.condition);
    setPriceResult(r);
    setCalcDone(true);
  };

  const BRANDS = ["Toyota", "Kia", "Hyundai", "BMW", "Mercedes", "Audi", "Volkswagen", "Skoda", "Lada", "Renault", "Nissan", "Mazda", "Honda", "Ford", "Lexus", "Другое"];
  const CONDITIONS = [{ val: "отличное", label: "Отличное (без вложений)" }, { val: "хорошее", label: "Хорошее (небольшие дефекты)" }, { val: "удовлетворительное", label: "Удовлетворительное (нужен ремонт)" }, { val: "битое", label: "Битое / после ДТП" }];

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#f8f6f3" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ backgroundColor: "rgba(248,246,243,0.97)", borderBottom: "1px solid #e8e4df", backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: "var(--red)" }} />
          <span className="font-display text-xl font-bold tracking-widest uppercase" style={{ color: "#111" }}>АвтоВыкуп</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "#555" }}>
          <a href="#advantages" className="hover:text-black transition-colors">Преимущества</a>
          <a href="#gallery" className="hover:text-black transition-colors">Галерея</a>
          <a href="#calculator" className="hover:text-black transition-colors">Расчёт цены</a>
          <a href="#reviews" className="hover:text-black transition-colors">Отзывы</a>
        </div>
        <a href="#contact" className="btn-primary px-5 py-2 text-sm rounded font-display tracking-wider uppercase">Оценить авто</a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ backgroundColor: "#f8f6f3" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(220,38,38,0.07) 0%, transparent 60%)" }} />
        <div className="absolute right-0 top-0 w-full md:w-3/5 h-full pointer-events-none overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/0c126e86-5279-43b4-8807-ef1a1c759df0/files/1f734ad5-9d38-4f5c-b832-9f732a420017.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.18, filter: "grayscale(30%)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #f8f6f3 0%, rgba(248,246,243,0.3) 40%, transparent 100%)" }} />
        </div>
        <div className="absolute left-0 top-0 w-1.5 h-full" style={{ backgroundColor: "var(--red)" }} />

        <div className="container-custom relative z-10 py-24">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-10"
              style={{ backgroundColor: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", color: "var(--red)" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--red)" }} />
              Работаем сейчас · Москва и область
            </div>

            <h1 className="font-display font-bold leading-tight mb-2" style={{ color: "#111" }}>
              <span className="block text-5xl md:text-7xl tracking-tight" style={{ animation: "fade-up 0.5s ease-out forwards" }}>ПОЛУЧИТЕ</span>
              <span className="block text-5xl md:text-7xl tracking-tight" style={{ color: "var(--red)", animation: "fade-up 0.5s ease-out 0.1s both" }}>НА 15–30%</span>
              <span className="block text-5xl md:text-7xl tracking-tight" style={{ animation: "fade-up 0.5s ease-out 0.2s both" }}>БОЛЬШЕ,</span>
              <span className="block text-4xl md:text-5xl tracking-tight mt-1" style={{ color: "#555", animation: "fade-up 0.5s ease-out 0.3s both" }}>чем у перекупщиков</span>
            </h1>

            <p className="text-lg md:text-xl mt-6 mb-3 max-w-xl leading-relaxed font-semibold" style={{ color: "#222", animation: "fade-up 0.5s ease-out 0.4s both" }}>
              Выкупаем авто за 1–3 часа — деньги на карту до того, как вы уедете домой
            </p>
            <p className="text-base mb-10 max-w-lg leading-relaxed" style={{ color: "#666", animation: "fade-up 0.5s ease-out 0.5s both" }}>
              Бесплатно приедем, оценим по рыночной базе и сразу назовём цену. Кредитные, битые, без документов — берём всё.
            </p>

            <div className="flex flex-col sm:flex-row gap-4" style={{ animation: "fade-up 0.5s ease-out 0.55s both" }}>
              <a href="#calculator" className="btn-primary px-8 py-4 text-base rounded inline-flex items-center gap-3 justify-center">
                <Icon name="Calculator" size={20} />
                Рассчитать цену онлайн
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

            <div className="flex flex-col gap-2.5 mt-8" style={{ animation: "fade-up 0.5s ease-out 0.65s both" }}>
              {[
                { icon: "Zap", text: "Выезд оценщика — бесплатно и в день обращения" },
                { icon: "BadgeCheck", text: "Цена фиксируется письменно — не снизим после осмотра" },
                { icon: "Banknote", text: "Деньги переводим ДО подписания ПТС" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(220,38,38,0.1)" }}>
                    <Icon name={item.icon as "Zap"} size={13} style={{ color: "var(--red)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "#444" }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-10 mt-12 pt-10" style={{ borderTop: "1px solid #e5e5e5", animation: "fade-up 0.5s ease-out 0.75s both" }}>
              {[{ num: "6 000+", label: "выкупленных авто" }, { num: "от 30 мин", label: "время оценки" }, { num: "9 лет", label: "на рынке" }].map((s) => (
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
      <section id="advantages" className="section-pad" style={{ backgroundColor: "#fff" }}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide" style={{ color: "#111" }}>Почему выбирают нас</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="rounded-xl p-7 transition-all duration-200 hover:-translate-y-1" style={{ backgroundColor: "#f8f6f3", border: "1px solid #ede9e4" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(220,38,38,0.1)" }}>
                  <Icon name={a.icon as "Clock"} size={22} style={{ color: "var(--red)" }} />
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-2" style={{ color: "#111" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section-pad" style={{ backgroundColor: "#f0ede8" }}>
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="red-line" />
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide" style={{ color: "#111" }}>Последние выкупы</h2>
            </div>
            <p className="text-sm" style={{ color: "#888" }}>Нажмите на карточку — посмотрите фото с разных сторон</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAR_GALLERY.map((car) => (
              <div
                key={car.id}
                className="rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
                style={{ backgroundColor: "#fff", border: "1px solid #e5e0da" }}
                onClick={() => setSelectedCar(car)}
              >
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img src={car.imgs[0]} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-display font-bold text-white" style={{ backgroundColor: "var(--red)" }}>
                    ВЫКУПЛЕНО
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
                    <Icon name="Images" size={13} />
                    <span>{car.imgs.length} фото</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-4 py-2 rounded-full text-white text-xs font-semibold" style={{ backgroundColor: "rgba(220,38,38,0.9)" }}>
                      Смотреть подробнее
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase tracking-wide leading-tight" style={{ color: "#111" }}>{car.name}</h4>
                      <p className="text-xs mt-1" style={{ color: "#888" }}>{car.year} · {car.mileage}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-sm font-bold" style={{ color: "var(--red)" }}>{car.price}</div>
                      <div className="text-xs mt-1" style={{ color: "#22c55e", fontWeight: 600 }}>{car.time}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="section-pad" style={{ backgroundColor: "#fff" }}>
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-14">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide" style={{ color: "#111" }}>Рассчитайте цену онлайн</h2>
            <p className="mt-3 text-base" style={{ color: "#666" }}>Введите параметры — получите реальный диапазон стоимости вашего авто</p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid #e5e0da" }}>
            <div className="grid md:grid-cols-2">
              {/* Левая: форма */}
              <div className="p-8" style={{ backgroundColor: "#f8f6f3" }}>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-6" style={{ color: "#111" }}>Параметры авто</h3>
                <div className="space-y-5">
                  {/* Марка */}
                  <div>
                    <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>Марка</label>
                    <select
                      value={calc.brand}
                      onChange={(e) => setCalc({ ...calc, brand: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors appearance-none"
                      style={{ border: "1px solid #ddd", backgroundColor: "#fff", color: "#222" }}
                    >
                      {BRANDS.map((b) => <option key={b} value={b.toLowerCase()}>{b}</option>)}
                    </select>
                  </div>

                  {/* Год */}
                  <div>
                    <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>
                      Год выпуска: <span style={{ color: "var(--red)" }}>{calc.year}</span>
                    </label>
                    <input
                      type="range" min={2005} max={2024} value={calc.year}
                      onChange={(e) => setCalc({ ...calc, year: +e.target.value })}
                      className="w-full accent-red-600"
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: "#aaa" }}>
                      <span>2005</span><span>2024</span>
                    </div>
                  </div>

                  {/* Пробег */}
                  <div>
                    <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>
                      Пробег: <span style={{ color: "var(--red)" }}>{calc.mileage} 000 км</span>
                    </label>
                    <input
                      type="range" min={0} max={300} value={calc.mileage}
                      onChange={(e) => setCalc({ ...calc, mileage: +e.target.value })}
                      className="w-full accent-red-600"
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: "#aaa" }}>
                      <span>0 км</span><span>300 000 км</span>
                    </div>
                  </div>

                  {/* Состояние */}
                  <div>
                    <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>Состояние</label>
                    <div className="grid grid-cols-2 gap-2">
                      {CONDITIONS.map((c) => (
                        <button
                          key={c.val}
                          onClick={() => setCalc({ ...calc, condition: c.val })}
                          className="px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all"
                          style={{
                            backgroundColor: calc.condition === c.val ? "var(--red)" : "#fff",
                            color: calc.condition === c.val ? "#fff" : "#444",
                            border: `1px solid ${calc.condition === c.val ? "var(--red)" : "#ddd"}`,
                          }}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleCalc} className="btn-primary w-full py-3.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 mt-2">
                    <Icon name="Calculator" size={18} />
                    Рассчитать стоимость
                  </button>
                </div>
              </div>

              {/* Правая: результат */}
              <div className="p-8 flex flex-col" style={{ backgroundColor: "#fff" }}>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-6" style={{ color: "#111" }}>Результат оценки</h3>

                {!calcDone ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f0ede8" }}>
                      <Icon name="Car" size={32} style={{ color: "#ccc" }} />
                    </div>
                    <p className="text-sm" style={{ color: "#aaa" }}>Выберите параметры и нажмите «Рассчитать»</p>
                  </div>
                ) : priceResult && (
                  <div className="flex-1 flex flex-col gap-5">
                    {/* Диапазон */}
                    <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: "#f8f6f3", border: "1px solid #ede9e4" }}>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#888" }}>Ориентировочная стоимость</div>
                      <div className="font-display text-3xl font-bold mb-1" style={{ color: "var(--red)" }}>
                        <AnimatedNumber value={priceResult.low} />
                      </div>
                      <div className="text-sm font-medium mb-1" style={{ color: "#aaa" }}>—</div>
                      <div className="font-display text-3xl font-bold" style={{ color: "#111" }}>
                        <AnimatedNumber value={priceResult.high} />
                      </div>
                      <p className="text-xs mt-3" style={{ color: "#aaa" }}>Точная цена после осмотра специалиста</p>
                    </div>

                    {/* Параметры выбранные */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Марка", val: BRANDS.find(b => b.toLowerCase() === calc.brand) ?? calc.brand },
                        { label: "Год", val: calc.year },
                        { label: "Пробег", val: `${calc.mileage} 000 км` },
                        { label: "Состояние", val: CONDITIONS.find(c => c.val === calc.condition)?.label.split(" (")[0] ?? calc.condition },
                      ].map((item) => (
                        <div key={item.label} className="rounded-lg p-3" style={{ backgroundColor: "#f8f6f3" }}>
                          <div className="text-xs" style={{ color: "#999" }}>{item.label}</div>
                          <div className="text-sm font-semibold mt-0.5" style={{ color: "#333" }}>{item.val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl p-4 flex gap-3" style={{ backgroundColor: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)" }}>
                      <Icon name="Info" size={16} style={{ color: "var(--red)", flexShrink: 0, marginTop: 2 }} />
                      <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
                        Это предварительный расчёт. Реальная цена может быть выше — после бесплатного осмотра.
                      </p>
                    </div>

                    <a href="#contact" className="btn-primary py-3 rounded-xl text-sm inline-flex items-center justify-center gap-2 mt-auto">
                      <Icon name="Send" size={16} />
                      Получить точное предложение
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section-pad" style={{ backgroundColor: "#f0ede8" }}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide" style={{ color: "#111" }}>Как это работает</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 h-px" style={{ background: "linear-gradient(to right, transparent, var(--red), transparent)", left: "12.5%", width: "75%" }} />
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="number-badge mb-5 relative z-10">{step.num}</div>
                <h3 className="font-display text-base font-bold uppercase tracking-wide mb-2" style={{ color: "#111" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section-pad" style={{ backgroundColor: "#fff" }}>
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide" style={{ color: "#111" }}>Что говорят клиенты</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-xl p-7 flex flex-col gap-4" style={{ backgroundColor: "#f8f6f3", border: "1px solid #ede9e4" }}>
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={16} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#444" }}>«{r.text}»</p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #e5e0da" }}>
                  <div>
                    <div className="font-display font-bold text-sm uppercase tracking-wide" style={{ color: "#111" }}>{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#888" }}>{r.city}</div>
                  </div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "var(--red)", border: "1px solid rgba(220,38,38,0.2)" }}>
                    {r.car}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad" style={{ backgroundColor: "#f0ede8" }}>
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <span className="red-line-center" />
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide" style={{ color: "#111" }}>Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all duration-200" style={{ backgroundColor: "#fff", border: `1px solid ${openFaq === i ? "var(--red)" : "#e5e0da"}` }}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display font-semibold uppercase tracking-wide text-sm pr-4" style={{ color: "#111" }}>{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: openFaq === i ? "var(--red)" : "#aaa", flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#555", borderTop: "1px solid #ede9e4" }}>
                    <p className="pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="section-pad" style={{ backgroundColor: "#fff" }}>
        <div className="container-custom max-w-2xl text-center">
          <span className="red-line-center" />
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4" style={{ color: "#111" }}>Узнайте точную цену</h2>
          <p className="mb-10" style={{ color: "#666" }}>Перезвоним в течение 5 минут и назовём сумму после бесплатного осмотра</p>
          <div className="rounded-2xl p-8 md:p-10 text-left shadow-sm" style={{ backgroundColor: "#f8f6f3", border: "1px solid #ede9e4" }}>
            <div className="space-y-5">
              {[
                { label: "Ваше имя", placeholder: "Иван Иванов", key: "name", type: "text" },
                { label: "Телефон", placeholder: "+7 (999) 000-00-00", key: "phone", type: "tel" },
                { label: "Ваш автомобиль", placeholder: "Марка, модель, год, пробег", key: "car", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={contactForm[field.key as keyof typeof contactForm]}
                    onChange={(e) => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                    style={{ border: "1px solid #ddd", backgroundColor: "#fff", color: "#222" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--red)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                  />
                </div>
              ))}
              <button className="btn-primary w-full py-4 rounded-xl text-base inline-flex items-center justify-center gap-3">
                <Icon name="Send" size={20} />
                Получить оценку
              </button>
            </div>
            <p className="text-center text-xs mt-5" style={{ color: "#aaa" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="py-14" style={{ backgroundColor: "#111", color: "#fff" }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: "var(--red)" }} />
                <span className="font-display text-xl font-bold tracking-widest uppercase">АвтоВыкуп</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#888" }}>Выкуп автомобилей дорого и быстро. Работаем с 2015 года. Честные цены, никаких скрытых комиссий.</p>
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
                    <span className="text-sm" style={{ color: "#888" }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold uppercase tracking-wider text-white mb-5 text-sm">Быстрая оценка</h4>
              <p className="text-sm mb-5" style={{ color: "#888" }}>Позвоните прямо сейчас и узнайте стоимость вашего авто</p>
              <a href="tel:+78001234567" className="btn-primary px-6 py-3 rounded inline-flex items-center gap-2 text-sm">
                <Icon name="Phone" size={16} />
                Позвонить
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs" style={{ borderTop: "1px solid #2a2a2a", color: "#666" }}>
            <p>© 2025 АвтоВыкуп. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальное окно карточки авто */}
      {selectedCar && <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </div>
  );
}
