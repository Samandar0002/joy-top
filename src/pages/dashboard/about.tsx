import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



function About() {
  const { t } = useTranslation();

  return (
    <>
      <div className="about-wrapper mx-8 pt-8">
        <div>
          <Link className="rounded-md bg-[#F0F0F0] p-2 no-underline" to="/">
            {t('Asosiy sahifaga qaytish')}
          </Link>
          <h3 className="mt-4 text-[22px] font-bold text-[#575757]">
            {t('Tog`larda dam olish joylari - saytda')}{' '}
            <a
              className="text-[#ff7e47] underline"
              href="https://www.joytop.uz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Joytop.uz
            </a>
          </h3>
          <p className="mb-4 mt-4 leading-[23px] text-[#575757]">
            {t('Mamlakatimizda siz yiliga 12 oy davomida oilangiz yoki do`stlaringiz bilan dam olish uchun sharoitlarni osongina topishingiz mumkin. Ayniqsa yozda ko`pchiligimiz shahar tashqarisiga shoshilamiz. Soyali joylarni qidirmoqda. Kimdir tog`larga, kimdir qirg`oqqa – adirlarga qarab ketmoqda. Tog`larda dam olish har doim ha  birimizning diqqatimiz markazida bo`ladi. Sayt haqidagi muhim ma`lumotlarni e`tiboringizga havola qilamiz')} {' '}
            <Link className="text-[#ff7e47] underline" target="_blank" to="https://www.joytop.uz">
              Joytop.uz
            </Link>
            {t('. Ushbu veb-sayt yordamida istalgan vaqtda yozgi uylar, kvartiralar, mehmonxonalar va lagerlarni topishingiz mumkin. Bundan tashqari, siz sayohat va ekstremal turlarni ham bron qilishingiz mumkin.')}
          </p>
          <p className="mt-4 leading-[23px] text-[#575757]">{t('Tog`larda dam olish yoki ichki turizm uchun sayohat')}</p>
          <p className="mt-4 leading-[23px] text-[#575757]">
            {t('Joytop.uz sayti ma`muriyati siz uchun hamma narsani shu qadar qulay qilib qo`yganki, siz saytga kirib o`zingizga yoqqan yo`nalishni tanlashingiz mumkin. Qaysi viloyat yoki tumanda dam olishni hohlardingiz, balki qisqa muddatga ijaraga uy olmoqchimisiz? Shunday qilib, o`zingiz yoqtirgan joyni tanlang va bron qiling. Bozlangan joy sizni o`sha kuni olib ketadi. Ilgari bitta holat keng tarqalgan edi. Misol uchun, siz ma`lum bir manzilda joylashgan dachaga keldingiz, ammo uning egasi uni allaqachon boshqalarga berganligi ma`lum bo`ldi. Ba`zi baxtsiz hodisalar ham bo`lgan. Endi bu sodir bo`lmaydi. Hamma narsa aniq va tushunarli ishlaydi. Siz sana va vaqtni belgilaysiz, manzilni tanlaysiz va buyurtmani joylashtirasiz. Joy egasi bundan xabardor bo`ladi va o`sha kuni siz bilan uchrashadi')}.
          </p>
          <p className="mt-4 leading-[23px] text-[#575757]">
            {t('Toshkent shahrida yoki boshqa viloyatlarda istalgan kvartirani ijaraga olishingiz mumkin. Bu erda tog`lardagi bayramlar ham kiritiladi. Mamlakatimizda ichki turizm bilan shug`ullanmoqchi bo`lsangiz, istalgan turga buyurtma bering. Saytda')} {' '}
            <Link className="text-[#ff7e47] underline" target="_blank" to="https://www.joytop.uz">
              Joytop.uz
            </Link>{' '}
            {t('siz velosiped sayohatlaridan tortib ot minish yoki parashyutdan sakrash bilan bog`liq ekstremal sport turlari haqida ma`lumot topasiz. Hozirgi vaqtda kvartiralarni ijaraga berish bilan bog`liq ko`plab muammolar mavjud. Aniqrog`i, to`g`ri kvartiralarni topish imkonsiz bo`lib qoldi. Chunki talab katta edi. Endi siz ushbu xonadonni oldindan ko`rishingiz, uning shartlari bilan tanishishingiz va tegishli qaror qabul qilishingiz mumkin. Siz ularning fotosuratlarini osongina ko`rishingiz va egasi bilan bog`lanishingiz mumkin.')}
          </p>
          <p className="mt-4 leading-[23px] text-[#575757]">
            {t('Keling, berish mavzusida alohida gaplashaylik. Agar siz saytdan ushbu bo`limga kirsangiz')}{' '}
            <Link className="text-[#ff7e47] underline" target="_blank" to="https://www.joytop.uz">
              Joytop.uz
            </Link>{' '}
            {t(', keyin Toshkent viloyatining barcha tog`li joylarida dam olish maskanlarini ko`rasiz. Ular haqida ma`lumot olish, sharoitlari bilan tanishish, narxlarni bilish mumkin. Taqvim bo`limida siz qaysi kunlar bron qilinganligini va aksincha, qaysi kunlar hali ham bepul ekanligini bilib olasiz. Maslahatlashing va qaror qabul qiling. Agar birinchisi band bo`lsa, ikkinchisi, agar u ham band bo`lsa, uchinchi, to`rtinchi va hokazo. Sizning ixtiyoringizda ko`plab variantlar bo`ladi.')}
          </p>
          <p className="mt-4 leading-[23px] text-[#575757]">{t('Mulk egalari uchun ajoyib imkoniyat.')}</p>
          <p className="mt-4 leading-[23px] text-[#575757]">
           {t('Yuqorida ta`kidlanganidek, bu mijozlar uchun edi. Ko`chmas mulk egalari tog`larda o`z kvartiralarini yoki dam olish uylarini osongina ijaraga olishlari mumkin. Buning uchun saytda ro`yxatdan o`ting va mulk haqidagi ma`lumotlarni kiriting. Ko`chmas mulk kvartira yoki yozgi uy bo`ladimi, kerakli turga bo`linadi. Joylashuv va barcha shartlar ko`rsatiladi. Aloqa o`rnatish uchun aloqa ma`lumotlari taqdim etiladi va egalarining o`zlari mijozlar qo`ng`iroqlariga javob beradilar. Eng muhimi, qancha ko`p ma`lumot bo`lsa, shuncha yaxshi. Yuqori sifatli fotosuratlardan foydalanish tavsiya etiladi.')}
          </p>
          <p className="mb-4 mt-4 leading-[23px] text-[#575757]">
            {t('Bugungi zamon shu qadar o`tkinchiki, ishdan turishning iloji yo`q. Har holda, bu yaxshi emas. Dam olish uchun vaqt topishingiz kerak. Shahar shovqinidan uzoqlashish va u yerdan xotirjamlik bilan qaytishga hech narsa teng kelmaydi. Bu sayt sizga yordam beradi')}{' '}
            <Link className="text-[#ff7e47] underline" target="_blank" to="https://www.joytop.uz">
              Joytop.uz
            </Link>{' '}
            {t('. Saytga o`ting va o`zingiz ko`ring.')}
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
