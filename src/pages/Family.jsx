import { useState } from 'react'
import FamilyTreeModal from '../components/FamilyTreeModal'
import Lightbox from '../components/Lightbox'
import { optimizedUrl } from '../utils/cloudinary'

// Add all Cloudinary photo URLs involving Jay's family here — no grouping needed.
const familyPhotos = [
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783566551/hnfjvvit5gaxycajxumf.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570866/received_958276661372684_ph1zc6.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570865/received_153739736209665_ljegvv.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570864/FB_IMG_1628072182823_o5jvfd.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570863/f65afb649ebec2918594fba151caaea7_xynchy.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570862/ee2622856c7de28bf126b42ed6cf56c5_oondns.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570862/da0b1360325899578a29e065c03f6d0a_jo2pkr.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570861/e075c72fb8630cff180633016c07dd80_taekc3.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570860/ca215355469c4270a852b0abbfc154e9_i0unmg.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570860/c4fff55d6e49aadf23d2f49a5e9c476b_pujpvv.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570859/c3f13109e58ef2e5b6ab3d1291cb328d_zhyjub.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570858/c2ff5b6ea78e317780b33c2e4f169e2c_kpltxi.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570857/bd84e0f4188b3876ea0baafbc97fc99d_bm5yfm.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570856/bc7bb0c6060ba28e1aaf77938f2b17d8_txmkxs.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570856/bb4c4ecdb7347bacca2b96561890b99f_xdughn.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570855/ba3414c8eb49e604e5fa2a6ca49f85a4_fglxkl.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570854/b131570550ce394a1317bc0790b32ba8_ucesuh.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570853/b73c4ce501dfe2c33ac6048d165e97e1_citzwl.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570853/a19d6f719ecca88906b3b5638372a62f_btu2ag.jpg ',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570852/979fb630892d31e124e2229b1d169951_sn3f8q.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570851/2883fc601f67384d9e08a8c6dfe3f45d_aidthb.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570850/838d83114af549c398929bbdbee2f08a_rjlk2w.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570849/152adef97ccd27a2e0478c51eb584756_hjjbmq.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570848/85ec6b19ad3ccf648365248f5acb4359_xqbmsn.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570848/7e76a4d806b9cf3a1801882c0a6d8a15_ieiujb.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570847/76ff0733c29f399706f7a6707578e511_xmd0vt.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570846/6ce59eb09b029d8051f28a1c40bac13c_zxofdz.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570845/3eb765eeedaa58a919e8b65189da72fb_upwat1.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570844/36ff1fb7032b9326c3c1ea309e58464b_delzlv.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570844/51cee45ae397ce8bb7078e7df16dfa7d_bsgyid.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570843/4a5d6cb11e5a64953b898f84d116a3d1_ov9kzx.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570842/2c790c4557b6bb15543d06b10e7bcdc5_kg5q1d.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570841/1e24dde596c3f4287d524d3362b7e833_fnvj8w.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570840/0ff87370107901152665974811ad5ceb_vyrddp.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570840/IMG_7420_ehwwhf.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570840/IMG_7535_ksleap.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570838/IMG_7419_ossie4.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570837/IMG_7418_qelugx.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570836/IMG_7417_sa4ddv.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570835/IMG_7416_qb3n4j.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570835/IMG_3416_qi25gw.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570835/received_1102597783591428_oadkus.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570834/FB_IMG_1624267769374_ybblac.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783570834/IMG_2959_sewmg2.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571830/IMG20201231235245_r4or1m.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571829/IMG20201229200500_rzbupi.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571828/IMG_20160717_180932_tnz2ok.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571827/IMG_20160318_035958_xsi7jq.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571826/IMG20210306195438_zbwzqw.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571825/IMG_20160626_181725_tsiin2.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571825/IMG_20160512_194920_sz2xtq.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571823/IMG_20160327_222242_uagsos.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571823/IMG_20160327_220257_bpqjyk.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571822/IMG_7541_b1lh9u.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571821/IMG_7549_azs4yz.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571820/IMG_20170514_203436_esatdu.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571819/IMG_20160220_232833_j46ojf.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571818/IMG_7543_zk5nmc.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571818/IMG_7546_ey3le4.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571816/IMG_7545_dlmdqc.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571816/IMG_7548_j2vvnj.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571815/IMG_7547_yqfwhl.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571814/IMG_7544_jxgj18.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571814/IMG_7550_syxixq.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571812/IMG_7542_mrrt1l.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571812/IMG_7540_dm3rvl.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783571811/IMG_20180927_192051_jrgb7b.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783575059/IMG_0529_f9rzmb.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783575057/IMG_0532_frxgj7.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576616/142046919_10215565546726773_2617528801916432365_n_x4hzsh.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576616/482235056_10222977721986522_1875495984801357498_n_c0mvri.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576615/485712201_10223047345127057_9093684871336305079_n_wziocg.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576615/486092921_10223047344727047_4090153182920025148_n_phw7ni.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576615/509609612_10223967391687646_9133799038126961648_n_ngc9au.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576615/510309193_10224024688440029_3596340166352871674_n_ubarsj.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576614/512991606_10224105584782387_3679048550524912828_n_kib5bh.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576615/487853284_10223135203723467_2243195681454141912_n_klkgul.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576615/487103761_10223114135636778_5795207469141442637_n_ve1nsx.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576614/493973528_10223400768722426_3110603177231194106_n_he8tc5.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576614/494592715_10223400768322416_2489018859569079517_n_pksswx.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576614/464512401_10221856929367407_8487466497962773289_n_inikae.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576614/513821264_10224115350066513_996062484412197056_n_vayrwa.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576614/514158124_10224133720285757_9130205170404328251_n_obrgqm.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576613/515630531_10224275698035112_2067210640409797357_n_iuevxs.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576613/493868730_10223400768402418_1464589656847975677_n_ivwrts.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576613/513860759_10224141536281152_3048166651633435405_n_virjso.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576613/495739578_10223519927661325_4548326782004659971_n_xcl3iv.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576612/497814450_10223566667029780_7744277999208199624_n_kudvok.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576613/514909846_10224265875389552_514737603221661338_n_s0jdbh.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576612/515495100_10224289871589442_3711110564654190149_n_f6o2re.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576612/508430248_10223918795792779_6510652684446950338_n_yrptby.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576612/515506962_10224290861934200_8438962686504114246_n_e5jfas.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576612/516195003_10224289872629468_4730676365026340900_n_kxdaec.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576611/514409856_10224300516495558_8349348491336559054_n_zslnua.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576611/503173643_10223732371652292_3916218413454639393_n_rrulfm.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576611/515876191_10224300519215626_995578215108596802_n_zynjsb.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576611/506628581_10223918819033360_4657613346843680115_n_xfvtqx.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576610/515504756_10224377838108550_7624908909632997424_n_w2g4v6.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576610/515294934_10224304995927541_6823063652212617503_n_oymp7s.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576610/517243898_10224377837788542_6669849612387062722_n_gvoe5e.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576610/514787203_10224304997847589_4341826611195588289_n_su9yub.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576610/514282744_10224302846953818_8807732367985220819_n_fpl5yy.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576609/515505874_10224300515135524_7768277816340251523_n_h9b07s.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576609/515502970_10224315741756180_2049992176304184875_n_d9dxgc.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576609/517399013_10224426527325750_3482675571365273429_n_yygpoq.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576609/516937072_10224383032278401_8276619911401964563_n_hptoiz.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576609/515504334_10224317808047836_3250182430012191542_n_oxh9du.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576609/640382087_10226464199066270_253532686434504943_n_aovmty.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576609/516771410_10224314366401797_2017159179347485682_n_xmowpg.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576608/506819731_10223895439888896_8905029923819858263_n_fspfpm.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576608/56361714_10211389815216095_293650474555408384_n_oswphj.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576608/44332987_10210531214631617_8092742202788151296_n_evfrgq.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576608/507107842_10223895152641715_1354956617332166393_n_znipc1.jpg',
  



]

// Group photos with everyone together
const everyonePhotos = [
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572106/IMG_5457_jhpxkg.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572134/dac4078b6f7f47d9529512ac34dbd946_f6gw1w.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572086/2f1c196e42b20b3ecefc19d809aea389_jajxli.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572085/74e314594ab05252ad53f559e289ce3e_mmkodq.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572073/IMG_7414_xxcc31.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572072/95e17b4a46f6791c63e2b87a760ffcc9_kcptzn.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572071/adb1f40eceac1e4134efc0f45c7d84df_tgrraw.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572070/186a2f586f891f6cea9fa0a716717cd6_nh56yv.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572069/4e9c8d01bfbae9f39e44077af9037048_nqmpmm.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572068/39f9b99b10f44ecacb34a7a425862169_bk9avz.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783572067/IMG_7547_jblbqc.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783574865/IMG_20170901_134523_t4sozh.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783574863/IMG_20170901_134515_t67jef.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783574861/IMG_20170901_134529_p0j87i.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576899/514486390_10224208549636444_5261645018057790824_n_ecnqhu.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576897/140585925_10215526222983704_6037663787672678255_n_d85mt6.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576898/509432352_10223941615963269_2576597123771691494_n_a3gunj.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576897/515498942_10224289872589467_1551224413037980844_n_qpc62q.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576898/515701581_10224241570581947_224832377546498545_n_kuiyel.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576897/514415258_10224241573702025_219409480199343491_n_tujigt.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576897/485364420_10223047344607044_5627865119020858660_n_tddxzv.jpg',
  'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783576896/492537046_10223374955197104_2921507112007975854_n_jk0w5p.jpg',


]

// Add Cloudinary video URLs here
const videos = [
  'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1778372910/SDE_Mama_and_Papa_Final_zsz5bo.mp4',
  'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1783577020/vid_yqwmbm.mp4',


]

export default function Family() {
  const [showTree, setShowTree] = useState(false)
  const [tab, setTab] = useState('family')
  const [lightbox, setLightbox] = useState(null)

  const hasFamilyPhotos = familyPhotos.length > 0

  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="w-2 h-2 rounded-full bg-ember inline-block animate-pulse mb-2" />
          <h1 className="font-serif text-3xl text-ink">Family</h1>
        </div>
        <button
          onClick={() => setShowTree(true)}
          className="text-xs font-sans text-ink/60 border border-mist rounded-full px-3 py-1.5 hover:text-ink hover:border-ink/40 transition-colors whitespace-nowrap"
        >
          See family tree
        </button>
      </div>

      <p className="text-ink/60 font-sans text-sm mb-6">
        Photos and moments with the people who loved him most.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'family', label: 'Family' },
          { key: 'everyone', label: 'Everyone' },
          { key: 'videos', label: 'Videos' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full font-sans text-sm transition-colors ${
              tab === t.key ? 'bg-ink text-parchment' : 'bg-white/60 text-ink/60 border border-mist'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Family tab */}
      {tab === 'family' && (
        <div>
          {!hasFamilyPhotos ? (
            <p className="text-center text-ink/50 font-sans text-sm py-8">
              No family photos added yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {familyPhotos.map((url, i) => (
                <button key={i} onClick={() => setLightbox(url)} className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={optimizedUrl(url, 'w_400,h_400,c_fill,q_auto,f_auto')}
                    alt="Family photo"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Everyone tab */}
      {tab === 'everyone' && (
        <div>
          {everyonePhotos.length === 0 ? (
            <p className="text-center text-ink/50 font-sans text-sm py-8">
              No group photos added yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {everyonePhotos.map((url, i) => (
                <button key={i} onClick={() => setLightbox(url)} className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={optimizedUrl(url, 'w_400,h_400,c_fill,q_auto,f_auto')}
                    alt="Family together"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    {/* Videos tab */}
    {tab === 'videos' && (
      <div>
        {videos.length === 0 ? (
          <p className="text-center text-ink/50 font-sans text-sm py-8">
            No videos added yet.
          </p>
        ) : (
          <div className="space-y-4">
            {videos.map((url, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-ink">
                <video controls className="w-full h-full object-cover">
                  <source src={optimizedUrl(url, 'q_auto')} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        )}
      </div>
    )}

      {showTree && <FamilyTreeModal onClose={() => setShowTree(false)} />}
      {lightbox && <Lightbox src={optimizedUrl(lightbox)} alt="Family photo" onClose={() => setLightbox(null)} />}
    </div>
  )
}