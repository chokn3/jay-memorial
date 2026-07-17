const parents = [
  { name: 'Avelino Guevarra', relation: 'Father', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323362/tatay_zcqt6a.jpg' },
  { name: 'Arsenia Guevarra', relation: 'Mother', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323362/nanay_zt6fjc.jpg' },
]

const siblingCouples = [
  [
    { name: 'Lauro Guevarra', relation: 'Brother', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323341/dady_mzn6wu.jpg' },
    { name: 'Racquel Parungao Guevarra', relation: "Lauro's Wife", photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323342/mamang_vbqung.jpg' },
  ],
  [
    { name: 'Raquel Guevarra Mangawang', relation: 'Sister', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323321/tita_raquel_mtzyxu.jpg' },
    { name: 'Jeffrey Mangawang', relation: "Raquel's Husband", photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323308/tito_jeff_rh3izd.jpg' },
  ],
  [
    { name: 'Rosalie Guevarra Gonzales', relation: 'Sister', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783574109/738180536_1786291089197104_2235828631897387103_n_k1djwh.jpg' },
    { name: 'Michael Gonzales', relation: "Rosalie's Husband", photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783574142/740953021_2815954462105138_340785814293270011_n_f1jhls.jpg' },
  ],
  [
    { name: 'Mhae Guevarra', relation: 'Sister', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323470/741248400_2130165387880787_746525086844101007_n_gmyfnl.jpg' },
    { name: 'Vboy Flojo', relation: "Mhae's Partner", photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323578/tito_vboy_ipdkkv.jpg' },
  ],
]


const inLaws = [
  { name: 'Nelson Alfaro', relation: "Wife's Father", photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783575541/741446731_2435549903589830_2654645851625961571_n_lnugiu.jpg' },
  { name: 'Michael Alfaro', relation: "Wife's Brother", photo: '' },
  { name: 'Mari Antonette Bacnagan', relation: "Wife's Sister", photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784325068/mheanne_ldzlig.jpg' },
]

const wife = { name: 'Racquel Guevarra', relation: 'Wife', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783575543/742381619_1340282370945582_4356055692937520059_n_suyfnc.jpg' }

const childCouples = [
  [
    { name: 'Jake Russel Guevarra', relation: 'Son', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783573535/8a6bce4a-c68b-4c72-bf49-9b638974d3e5_ju81gf.jpg' },
    { name: 'Deanne Maxinne Paloma', relation: "Jake's Partner", photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784323258/chin_fboumc.jpg' },
  ],
  [
    { name: 'Jacque Rachel Labaguis', relation: 'Daughter', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783573416/739155582_25416119411419189_2677299126708724050_n_eppk0b.jpg' },
    { name: 'Aaron Jeoffrey Labaguis', relation: 'Son-in-Law', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324805/aaron_ebuavb.jpg' },
  ],
]

const grandchildren = [{ name: 'Ariana Labaguis', relation: 'Granddaughter', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324257/ari_ylji98.jpg' }]

const niecesNephews = [
  { name: 'Ezekiel Gonzales', relation: 'Nephew', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324709/kiel_fkiqsh.jpg' },
  { name: 'Jasper Guevarra', relation: 'Nephew', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324706/rorok_wpc0t1.jpg' },
  { name: 'Joshua Guevarra', relation: 'Nephew', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324705/koyang_akqyif.jpg' },
  { name: 'Larah Mae Guevarra', relation: 'Niece', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324705/momay_zy9bky.jpg' },
  { name: 'Mark Jehan Guevarra', relation: 'Nephew', photo: '' },
  { name: 'Christler Mangawang', relation: 'Nephew', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324705/leleng_akaaon.jpg' },
  { name: 'Christine Mangawang', relation: 'Niece', photo: '' },
  { name: 'Isabella Guevarra', relation: 'Niece', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783574716/743117976_1410952430876620_3278505633905182692_n_gs0awu.jpg' },
]

const extended = [{ name: 'Ninang', relation: 'Aunt / Godmother', photo: 'https://res.cloudinary.com/dgd7zzp5t/image/upload/v1784324342/ninang_ea3icx.jpg' }]

function Avatar({ name, relation, photo, highlight, size = 'md' }) {
  const initial = name.trim().charAt(0).toUpperCase()
  const dims = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12'
  const width = size === 'sm' ? 'w-16' : 'w-[4.5rem]'

  return (
    <div className={`flex flex-col items-center text-center ${width}`}>
      <div
        className={`${dims} rounded-full overflow-hidden flex items-center justify-center font-serif text-sm mb-1 shrink-0 ${
          highlight ? 'ring-2 ring-ember ring-offset-2 ring-offset-parchment' : ''
        } ${photo ? '' : highlight ? 'bg-ember text-ink' : 'bg-moss text-parchment'}`}
      >
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          initial
        )}
      </div>
      <p className="font-sans text-[10.5px] font-medium text-ink leading-tight">{name}</p>
      <p className="font-sans text-[9.5px] text-ink/45 leading-tight">{relation}</p>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="text-center text-ink/40 font-sans text-[10px] uppercase tracking-wide mb-2.5">
      {children}
    </p>
  )
}

function Connector() {
  return <div className="w-px h-4 bg-mist mx-auto" />
}

function Couple({ a, b, size }) {
  return (
    <div className="flex items-end justify-center gap-1.5">
      <Avatar {...a} size={size} />
      <span className="text-ember text-sm mb-4">&amp;</span>
      <Avatar {...b} size={size} />
    </div>
  )
}

export default function FamilyTreeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />

      <div
        className="relative bg-parchment w-full sm:max-w-md max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col animate-fade-in-up"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-mist shrink-0">
          <h2 className="font-serif text-xl text-ink">Family Tree</h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink text-sm font-sans">
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 space-y-4">
          {/* Parents */}
          <div>
            <SectionLabel>Parents</SectionLabel>
            <div className="flex justify-center gap-4">
              {parents.map((p) => (
                <Avatar key={p.name} {...p} size="sm" />
              ))}
            </div>
          </div>

          <Connector />

          {/* Jay's generation */}
          <div>
            <SectionLabel>Jay's Generation</SectionLabel>
          <div className="flex justify-center">
            <Avatar
              name="Jay Guevarra"
              relation="In Loving Memory"
              photo="https://res.cloudinary.com/dgd7zzp5t/image/upload/v1783575354/515491806_10224274807092839_6111844721753417517_n_txg8ta.jpg"
              highlight
              size="sm"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 mt-3">
            {siblingCouples.map((couple, i) => (
              <Couple key={i} a={couple[0]} b={couple[1]} size="sm" />
            ))}
          </div>
          </div>

          <Connector />

          {/* Wife's side / in-laws */}
          <div>
            <SectionLabel>Wife's Family</SectionLabel>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-3">
              {inLaws.map((p) => (
                <Avatar key={p.name} {...p} size="sm" />
              ))}
            </div>
          </div>

          <Connector />

          {/* Wife */}
          <div>
            <SectionLabel>Wife</SectionLabel>
            <div className="flex justify-center">
              <Avatar {...wife} size="sm" />
            </div>
          </div>

          <Connector />

          {/* Children */}
          <div>
            <SectionLabel>Children &amp; Their Families</SectionLabel>
            <div className="flex flex-col gap-3">
              {childCouples.map((couple, i) => (
                <Couple key={i} a={couple[0]} b={couple[1]} size="sm" />
              ))}
            </div>
          </div>

          <Connector />

          {/* Grandchildren */}
          <div>
            <SectionLabel>Grandchildren</SectionLabel>
            <div className="flex justify-center">
              {grandchildren.map((p) => (
                <Avatar key={p.name} {...p} size="sm" />
              ))}
            </div>
          </div>

          <Connector />

          {/* Nieces & Nephews */}
          <div>
            <SectionLabel>Nieces &amp; Nephews</SectionLabel>
            <div className="grid grid-cols-4 gap-x-2 gap-y-3 justify-items-center">
              {niecesNephews.map((p) => (
                <Avatar key={p.name} {...p} size="sm" />
              ))}
            </div>
          </div>

          {/* Extended */}
          <div className="border-t border-mist pt-4">
            <SectionLabel>Extended Family</SectionLabel>
            <div className="flex justify-center">
              {extended.map((p) => (
                <Avatar key={p.name} {...p} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}