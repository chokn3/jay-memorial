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


]

// Add Cloudinary video URLs here
const videos = [
  'https://res.cloudinary.com/dgd7zzp5t/video/upload/v1778372910/SDE_Mama_and_Papa_Final_zsz5bo.mp4',


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
                <video key={i} controls className="w-full rounded-xl">
                  <source src={optimizedUrl(url, 'q_auto')} type="video/mp4" />
                </video>
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