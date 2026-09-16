// BIO PASS - Gen Z Biology Notes Interactive Engine (Mobile Responsive & Light Theme)

// Global State
let currentChapter = 'all';
let currentViewMode = 'notes';
let activeFlashcardIndex = 0;
let filteredFlashcards = [];
let userQuizAnswers = {};

// Full Chapter Data Structure
const CHAPTERS_DATA = [
    {
        id: 1,
        title: "บทที่ 1: การรับรู้และการตอบสนอง",
        weight: "3 ข้อสอบ A-Level",
        icon: "🧠",
        gradient: "from-emerald-500 to-teal-500",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
        sections: [
            {
                id: "1-1",
                title: "1. โครงสร้างและการทำงานของเซลล์ประสาท",
                hasDiagram: true,
                diagramPath: "assets/images/action_potential.png",
                diagramTitle: "Action Potential Graph & Ionic Movement",
                diagramCaption: "กราฟแสดงการเกิด Action Potential และการเปลี่ยนผ่านของไอออนผ่าน Sodium-Potassium Channel",
                topics: [
                    {
                        subTitle: "ประเภทของเซลล์ประสาท (แบ่งตามหน้าที่)",
                        content: `
                            <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
                                <li class="flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-800 shrink-0">Sensory</span>
                                    <span><b>Sensory neuron (รับความรู้สึก):</b> ตัวเซลล์มักอยู่นอกระบบประสาทศูนย์กลาง เช่น บริเวณ <b>Dorsal root ganglion</b> (ปมประสาทรากบนของไขสันหลัง)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-teal-100 text-teal-800 shrink-0">Interneuron</span>
                                    <span><b>Interneuron (ประสานงาน):</b> อยู่ภายในระบบประสาทศูนย์กลาง (CNS: สมองและไขสันหลัง) <b>ทั้งหมด</b></span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-cyan-100 text-cyan-800 shrink-0">Motor</span>
                                    <span><b>Motor neuron (สั่งการ):</b> ตัวเซลล์อยู่ใน CNS ส่ง Axon ออกไปยึดกับ Effectors/Organs (เช่น สั่งการกล้ามเนื้อลาย)</span>
                                </li>
                            </ul>
                        `
                    },
                    {
                        subTitle: "ปัจจัยที่มีผลต่อความเร็วของกระแสประสาท (จุดเน้นวิเคราะห์)",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 mt-2">
                                <div class="bg-slate-50 border border-slate-200 p-3 sm:p-3.5 rounded-2xl">
                                    <div class="font-bold text-xs text-emerald-700 mb-1">📏 เส้นผ่านศูนย์กลางของ Axon</div>
                                    <p class="text-xs text-slate-600">ยิ่งกว้าง ยิ่งส่งสัญญาณได้เร็วขึ้น เนื่องจากความต้านทานภายในเซลล์ (Internal resistance) ต่ำลง</p>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 sm:p-3.5 rounded-2xl">
                                    <div class="font-bold text-xs text-cyan-700 mb-1">⚡ เยื่อหุ้มไมอีลิน (Myelin Sheath)</div>
                                    <p class="text-xs text-slate-600">ทำให้เกิดการนำแบบก้าวกระโดด (<b>Saltatory conduction</b>) บริเวณ <b>Node of Ranvier</b> ซึ่งเป็นจุดที่มี Voltage-gated Na⁺ channel หนาแน่นที่สุด</p>
                                </div>
                            </div>
                        `
                    },
                    {
                        subTitle: "ขั้นตอนการเกิด Action Potential (ลำดับศักย์ไฟฟ้า)",
                        content: `
                            <div class="space-y-2 mt-2">
                                <div class="p-2.5 sm:p-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-800">
                                    <span class="font-bold text-slate-900">1. Resting State (-70 mV):</span> Na⁺/K⁺ pump (3 Na⁺ ออก, 2 K⁺ เข้า) ร่วมกับ K⁺ leak channel ที่ปล่อย K⁺ รั่วออก
                                </div>
                                <div class="p-2.5 sm:p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800">
                                    <span class="font-bold text-emerald-800">2. Depolarization:</span> สิ่งเร้ากระตุ้นถึง Threshold (-55 mV) &rarr; Voltage-gated Na⁺ channel เปิด &rarr; Na⁺ ทะลักเข้าเซลล์ ศักย์ไฟฟ้าพุ่งขึ้นแตะ <b class="text-emerald-700 font-extrabold">+35 mV</b>
                                </div>
                                <div class="p-2.5 sm:p-3 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-slate-800">
                                    <span class="font-bold text-teal-800">3. Repolarization:</span> Voltage-gated Na⁺ ปิด &rarr; Voltage-gated K⁺ channel เปิด &rarr; K⁺ ไหลทะลักออกนอกเซลล์ ศักย์ไฟฟ้าดิ่งลง
                                </div>
                                <div class="p-2.5 sm:p-3 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-slate-800">
                                    <span class="font-bold text-cyan-800">4. Hyperpolarization (-80 mV):</span> Voltage-gated K⁺ ปิดช้า ทำให้ K⁺ ออกเกิน ศักย์ไฟฟ้าลดต่ำกว่า Resting state
                                </div>
                                <div class="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                                    <b>Refractory Period:</b> ช่วงดื้อ Absolute (เกิด Action Potential ซ้ำไม่ได้เด็ดขาด) และ Relative (เกิดซ้ำได้หากสิ่งเร้าแรงกว่าปกติมาก)
                                </div>
                            </div>
                        `
                    }
                ],
                examTip: "จำค่าตัวเลขให้แม่น! Resting = -70 mV | Threshold = -55 mV | Peak = +35 mV | Hyperpolarization = -80 mV และจำได้เลยว่า Depol = Na⁺ เข้า, Repol = K⁺ ออก!"
            },
            {
                id: "1-2",
                title: "2. การส่งสัญญาณผ่าน Synapse และอวัยวะรับสัมผัส",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "Chemical Synapse & สารสื่อประสาท",
                        content: `
                            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                เมื่อ Action Potential มาถึงปลาย Axon &rarr; <b>Voltage-gated Ca²⁺ channel เปิด</b> &rarr; Ca²⁺ ไหลเข้าสู่ปลายประสาท &rarr; กระตุ้นให้ถุงบรรจุสารสื่อประสาทหลอมรวมเยื่อหุ้มเซลล์ทำ <b>Exocytosis</b> ปลดปล่อย Neurotransmitter (เช่น Acetylcholine, Norepinephrine) ข้าม Synaptic cleft
                            </p>
                        `
                    },
                    {
                        subTitle: "กลไกการมองเห็นและการทรงตัว (ประสาทสัมผัส)",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 mt-2">
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700">
                                    <span class="font-bold text-amber-700 block mb-1">👁️ การมองเห็น (ตา)</span>
                                    อาศัยสารสี <b>Rhodopsin</b> (Opsin + Retinal) เมื่อถูกแสง Retinal จะเปลี่ยนรูปร่างจาก <i>cis</i> เป็น <i>trans</i> ทำให้ Rhodopsin แตกตัว ส่งสัญญาณประสาทเข้าสู่สมอง
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700">
                                    <span class="font-bold text-cyan-700 block mb-1">👂 การทรงตัว (หู)</span>
                                    - <b>Static equilibrium</b> (ทิศทางตามแรงโน้มถ่วง/ก้มเงย): เกิดที่ <b>Utricle & Saccule</b><br>
                                    - <b>Dynamic equilibrium</b> (การหมุนศีรษะ/หมุนตัว): เกิดที่ <b>Semicircular canals</b>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            {
                id: "1-3",
                title: "3. ระบบประสาทศูนย์กลาง (CNS) และรอบนอก (PNS)",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "เส้นประสาทสมอง (Cranial Nerves 12 คู่) - ตัวท็อปออกสอบ",
                        content: `
                            <div class="space-y-2 text-xs text-slate-700">
                                <div class="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                    <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold shrink-0 w-fit">รับรู้สึกอย่างเดียว</span>
                                    <span><b>คู่ที่ 1 (Olfactory - กลิ่น)</b>, <b>คู่ที่ 2 (Optic - มองเห็น)</b>, <b>คู่ที่ 8 (Vestibulocochlear - ฟัง/ทรงตัว)</b></span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                    <span class="px-2 py-0.5 rounded bg-violet-100 text-violet-800 font-bold shrink-0 w-fit">Vagus Nerve (คู่ที่ 10)</span>
                                    <span>เส้นประสาทพาราซิมพาเทติกสายหลัก เลี้ยงอวัยวะภายในช่องอกและช่องท้องทั้งหมด</span>
                                </div>
                            </div>
                        `
                    },
                    {
                        subTitle: "ตารางเปรียบเทียบระบบประสาทอัตโนวัติ (Autonomic Nervous System)",
                        content: `
                            <div class="overflow-x-auto mt-2 no-scrollbar">
                                <table class="w-full min-w-[500px] text-xs text-left text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
                                    <thead class="bg-slate-100 text-slate-900 font-bold">
                                        <tr>
                                            <th class="p-2.5 border-b border-slate-200">ระบบ</th>
                                            <th class="p-2.5 border-b border-slate-200">สภาวะร่างกาย</th>
                                            <th class="p-2.5 border-b border-slate-200">ความยาว Axon</th>
                                            <th class="p-2.5 border-b border-slate-200">สารสื่อประสาทปลายทาง</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 bg-white">
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-amber-700">Sympathetic</td>
                                            <td class="p-2.5">Fight or Flight (ตื่นเต้น/ม่านตาขยาย/หัวใจเต้นเร็ว/ยับยั้งย่อย)</td>
                                            <td class="p-2.5">Pre-ganglion สั้น, Post-ganglion ยาว</td>
                                            <td class="p-2.5 text-amber-700 font-bold">Norepinephrine</td>
                                        </tr>
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-teal-700">Parasympathetic</td>
                                            <td class="p-2.5">Rest and Digest (ผ่อนคลาย/ม่านตาหรี่/หัวใจเต้นช้า/กระตุ้นย่อย)</td>
                                            <td class="p-2.5">Pre-ganglion ยาว, Post-ganglion สั้น</td>
                                            <td class="p-2.5 text-teal-700 font-bold">Acetylcholine (ACh)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        `
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "บทที่ 2: ระบบต่อมไร้ท่อ (Endocrine System)",
        weight: "5 ข้อสอบ A-Level",
        icon: "🧪",
        gradient: "from-violet-500 to-purple-500",
        badgeColor: "bg-violet-100 text-violet-800 border-violet-300",
        sections: [
            {
                id: "2-1",
                title: "1. ชนิดและการทำงานของฮอร์โมน (แบ่งตามการละลาย)",
                hasDiagram: true,
                diagramPath: "assets/images/endocrine_system.png",
                diagramTitle: "Endocrine Glands Overview in Human Body",
                diagramCaption: "ตำแหน่งของต่อมไร้ท่อสำคัญในร่างกายมนุษย์ (Hypothalamus, Pituitary, Thyroid, Parathyroid, Pancreas, Adrenal)",
                topics: [
                    {
                        subTitle: "เปรียบเทียบกลไกของฮอร์โมน 2 กลุ่มหลัก",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 mt-2 text-xs">
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                                    <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold">Amine / Peptide / Protein</span>
                                    <p class="mt-2 text-slate-700"><b>ละลายน้ำได้ดี:</b> ไม่สามารถแพร่ผ่านเยื่อหุ้มเซลล์ไขมันได้ ต้องจับกับ <b>Receptor บนเยื่อหุ้มเซลล์</b> (เช่น Insulin, Glucagon, ADH, TSH)</p>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                                    <span class="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">Steroid Hormones</span>
                                    <p class="mt-2 text-slate-700"><b>ละลายในไขมัน:</b> สามารถแพร่ผ่านเยื่อหุ้มเซลล์เข้าไปจับกับ <b>Receptor ภายในเซลล์/นิวเคลียส</b> ได้โดยตรง (เช่น Sex hormones, Cortisol, Aldosterone)</p>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            {
                id: "2-2",
                title: "2. ต่อมไร้ท่อสำคัญและฮอร์โมนที่ต้องจำให้ขึ้นใจ",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "สรุปต่อมและฮอร์โมนออกสอบบ่อย",
                        content: `
                            <div class="overflow-x-auto mt-2 no-scrollbar">
                                <table class="w-full min-w-[550px] text-xs text-left text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
                                    <thead class="bg-slate-100 text-slate-900 font-bold">
                                        <tr>
                                            <th class="p-2.5 border-b border-slate-200">ต่อม / เนื้อเยื่อ</th>
                                            <th class="p-2.5 border-b border-slate-200">ฮอร์โมน</th>
                                            <th class="p-2.5 border-b border-slate-200">หน้าที่สำคัญ & ประเด็นข้อสอบ</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 bg-white">
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-violet-800">Hypothalamus</td>
                                            <td class="p-2.5 font-bold text-emerald-700">ADH, Oxytocin</td>
                                            <td class="p-2.5"><b>สร้างที่ Hypothalamus</b> แต่ส่งไปเก็บและหลั่งที่ต่อมหมวกใต้สมองส่วนหลัง (Posterior pituitary)</td>
                                        </tr>
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-violet-800">Anterior Pituitary</td>
                                            <td class="p-2.5 font-bold text-teal-700">GH, TSH, ACTH, FSH, LH, Prolactin</td>
                                            <td class="p-2.5">ถูกควบคุมด้วย Releasing/Inhibiting hormones จาก Hypothalamus ผ่านระบบหลอดเลือด</td>
                                        </tr>
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-violet-800">Thyroid Gland</td>
                                            <td class="p-2.5 font-bold text-cyan-700">T3, T4, Calcitonin</td>
                                            <td class="p-2.5">T3/T4 คุม Metabolism / <b>Calcitonin ลด Ca²⁺ ในเลือด</b> (สะสมเข้ากระดูก)</td>
                                        </tr>
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-violet-800">Parathyroid Gland</td>
                                            <td class="p-2.5 font-bold text-amber-700">PTH (Parathyroid hormone)</td>
                                            <td class="p-2.5"><b>เพิ่ม Ca²⁺ ในเลือด</b> (สลายจากกระดูก + ดูดกลับที่ท่อไต) ทำงานตรงข้ามกับ Calcitonin</td>
                                        </tr>
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-violet-800">Pancreas (Islets)</td>
                                            <td class="p-2.5 font-bold text-pink-700">Insulin (&beta;), Glucagon (&alpha;)</td>
                                            <td class="p-2.5">Insulin ลดน้ำตาลในเลือด / Glucagon สลายไกลโคเจนเพิ่มน้ำตาลในเลือด</td>
                                        </tr>
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-violet-800">Adrenal Cortex</td>
                                            <td class="p-2.5 font-bold text-purple-700">Cortisol, Aldosterone</td>
                                            <td class="p-2.5">Cortisol คุมเครียดระยะยาว / Aldosterone ดูดกลับ Na⁺ ที่ไต (ทำงานร่วมกับระบบ RAAS)</td>
                                        </tr>
                                        <tr class="hover:bg-slate-50">
                                            <td class="p-2.5 font-bold text-violet-800">Adrenal Medulla</td>
                                            <td class="p-2.5 font-bold text-rose-700">Adrenaline (Epinephrine)</td>
                                            <td class="p-2.5">ตอบสนองความเครียดระยะสั้น ร่วมกับระบบ Sympathetic nervous system</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        `
                    }
                ]
            },
            {
                id: "2-3",
                title: "3. กลไก Negative Feedback Axis & อาการความผิดปกติ",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "Negative Feedback (Hypothalamus-Pituitary-Thyroid Axis)",
                        content: `
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700">
                                Hypothalamus หลั่ง <b>TRH</b> &rarr; กระตุ้น Anterior Pituitary หลั่ง <b>TSH</b> &rarr; กระตุ้น Thyroid หลั่ง <b>T3/T4</b> &rarr; เมื่อ T3/T4 ในเลือดสูง จะย้อนกลับไป <b>ยับยั้ง TRH และ TSH</b>
                            </div>
                        `
                    },
                    {
                        subTitle: "ความผิดปกติของระบบต่อมไร้ท่อ (โรคที่ออกสอบบ่อย)",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 mt-2 text-xs">
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1">
                                    <div class="font-bold text-amber-700">💧 Diabetes Insipidus (เบาจืด)</div>
                                    <p class="text-slate-600">ขาด ADH ทำให้ท่อขดส่วนปลายและท่อรวมดูดน้ำกลับไม่ได้ ปัสสาวะเจือจางและปริมาณมาก</p>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1">
                                    <div class="font-bold text-pink-700">🌝 Cushing's Syndrome</div>
                                    <p class="text-slate-600">Cortisol สูงเกินไป ทำให้หน้ากลม (Moon face) มีโหนกเนื้อที่หลัง (Buffalo hump)</p>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1">
                                    <div class="font-bold text-cyan-700">👀 Grave's Disease</div>
                                    <p class="text-slate-600">Hyperthyroidism ร่างกายสร้างแอนติบอดีกระตุ้น TSH receptor ตาโปน หัวใจเต้นเร็ว น้ำหนักลด</p>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1">
                                    <div class="font-bold text-emerald-700">📏 Gigantism vs Acromegaly</div>
                                    <p class="text-slate-600">GH สูงเกินไปในวัยเด็ก (Gigantism - ตัวสูงใหญ่) vs GH สูงเกินในวัยผู้ใหญ่ (Acromegaly - กระดูกใบหน้ามือเท้าขยายใหญ่)</p>
                                </div>
                            </div>
                        `
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "บทที่ 3: การเคลื่อนที่ของสิ่งมีชีวิต (Locomotion)",
        weight: "12 ข้อสอบ A-Level (เยอะที่สุด! ⭐)",
        icon: "🦴",
        gradient: "from-amber-500 to-orange-500",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        sections: [
            {
                id: "3-1",
                title: "1. สิ่งมีชีวิตเซลล์เดียวและสัตว์ไม่มีกระดูกสันหลัง",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "กลไกการเคลื่อนที่ของสิ่งมีชีวิตกลุ่มต่างๆ",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                                    <span class="font-bold text-amber-700">🦠 Amoeba:</span> ใช้ <b>Pseudopodium</b> (เท้าเทียม) เกิดจาก <b>Microfilament (Actin)</b> เปลี่ยนกลับไปมาระหว่าง Ectoplasm (Gel) และ Endoplasm (Sol)
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                                    <span class="font-bold text-cyan-700">🏊 Paramecium / Euglena:</span> ใช้ <b>Cilia / Flagellum</b> มีโครงสร้าง <b>9+2 Microtubules</b> (มีแกน Dynein motor protein) และ Basal body แบบ <b>9+0</b>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                                    <span class="font-bold text-emerald-700">🪼 แมงกะพรุน & หมึก:</span> แมงกะพรุนหดตัวขอบร่มพ่นน้ำออกทางด้านล่าง / หมึก น้ำเข้า Mantle cavity แล้วบีบพ่นออกทาง <b>Siphon</b>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                                    <span class="font-bold text-violet-700">⭐ ดาวทะเล (Starfish):</span> ใช้ <b>Water Vascular System</b><br>
                                    Madreporite &rarr; Stone canal &rarr; Ring canal &rarr; Radial canal &rarr; Ampulla &rarr; <b>Tube feet</b>
                                </div>
                            </div>
                        `
                    },
                    {
                        subTitle: "กลไกการเคลื่อนที่ของแมลง (Insect Antagonism)",
                        content: `
                            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                                ยึดกล้ามเนื้อกับเปลือกนอก (Exoskeleton) มีกล้ามเนื้อ 2 ชุดทำงานตรงข้ามกัน (<b>Antagonism</b>):<br>
                                - <b>Extensor (สยายขา)</b> vs <b>Flexor (งอขา)</b><br>
                                - <b>การบิน:</b> กล้ามเนื้อยึดเปลือกหุ้มอกตามยาว และ กล้ามเนื้อยึดเปลือกหุ้มอกตามรูปตั้ง ทำงานสลับกัน
                            </p>
                        `
                    }
                ]
            },
            {
                id: "3-2",
                title: "2. การเคลื่อนที่ของมนุษย์ & กลไกการหดตัวของกล้ามเนื้อลาย",
                hasDiagram: true,
                diagramPath: "assets/images/sarcomere.png",
                diagramTitle: "Sarcomere Structure (Thick & Thin Filaments)",
                diagramCaption: "โครงสร้างหน่วยหดตัว Sarcomere แสดงตำแหน่ง A-Band, I-Band, H-Zone, Z-Line และ M-Line",
                topics: [
                    {
                        subTitle: "ข้อต่อ (Joints) & เอ็นยึด",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700">
                                    <b>Hinge joint (ข้อพับ):</b> ข้อศอก ข้อเข่า (ทิศทางเดียว)<br>
                                    <b>Ball and Socket joint (เบ้า):</b> หัวไหล่ ข้อสะโพก (หมุนได้หลายทิศทาง)
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700">
                                    <b>Tendon (เอ็นยึดกล้ามเนื้อ):</b> ยึดกระดูกกับกล้ามเนื้อ (ส่งแรงหดตัว)<br>
                                    <b>Ligament (เอ็นยึดข้อ):</b> ยึดกระดูกกับกระดูก (เพิ่มความเสถียร)
                                </div>
                            </div>
                        `
                    },
                    {
                        subTitle: "Sliding Filament Theory (กลไกการหดตัวระดับโมเลกุล)",
                        content: `
                            <div class="space-y-2 text-xs sm:text-sm text-slate-700 mt-2">
                                <p><b>Sarcomere:</b> หน่วยการหดตัวของกล้ามเนื้อลาย (วัดจาก Z-line ถึง Z-line)</p>
                                <p>• <b>Thick Filament:</b> ประกอบด้วยโปรตีน Myosin<br>
                                • <b>Thin Filament:</b> ประกอบด้วย Actin, Tropomyosin และ Troponin</p>
                                <div class="bg-slate-50 border border-slate-200 p-3 sm:p-3.5 rounded-2xl space-y-1.5 text-xs">
                                    <div class="font-bold text-amber-800">🔄 ลำดับขั้นตอนการหดตัว:</div>
                                    <ol class="list-decimal list-inside space-y-1 text-slate-700">
                                        <li>Action Potential ลงมาตาม <b>T-tubule</b> &rarr; กระตุ้นการหลั่ง Ca²⁺ จาก <b>Sarcoplasmic Reticulum (SR)</b></li>
                                        <li>Ca²⁺ จับกับ <b>Troponin</b> &rarr; ดึง Tropomyosin หลบ เพื่อเปิดตำแหน่งจับบน Actin</li>
                                        <li>หัว Myosin (ที่มี ADP + Pi) จับกับ Actin เกิด <b>Cross-bridge</b></li>
                                        <li>ปลดปล่อย Pi และ ADP เกิด <b>Power stroke</b> (ดึง Thin filament เข้าหา M-line)</li>
                                        <li><b>ATP โมเลกุลใหม่</b> เข้าจับกับ Myosin เพื่อให้หัว Myosin หลุดออกจาก Actin (หากขาด ATP จะเกิด <b>Rigor mortis / ศพเกร็ง</b>)</li>
                                    </ol>
                                </div>
                            </div>
                        `
                    },
                    {
                        subTitle: "การเปลี่ยนแปลงความยาว Sarcomere ขณะกล้ามเนื้อหดตัว (ออกสอบทุกปี!)",
                        content: `
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mt-2">
                                <div class="p-2.5 bg-emerald-100 border border-emerald-300 rounded-xl text-center text-emerald-900">
                                    <span class="font-bold block">A-band</span>
                                    ความยาวเท่าเดิมเสมอ!
                                </div>
                                <div class="p-2.5 bg-amber-100 border border-amber-300 rounded-xl text-center text-amber-900">
                                    <span class="font-bold block">I-band & H-zone</span>
                                    สั้นลงหรือหายไป!
                                </div>
                                <div class="p-2.5 bg-cyan-100 border border-cyan-300 rounded-xl text-center text-cyan-900">
                                    <span class="font-bold block">Z-line ถึง Z-line</span>
                                    ระยะแคบลง!
                                </div>
                            </div>
                        `
                    }
                ],
                examTip: "จำกฎ A-band: 'A-band เท่าเดิมเสมอ' ไม่ว่าจะหดตัวหรือคลายตัว! ส่วน Rigor mortis เกิดเพราะขาด ATP ทำให้หัว Myosin ไม่หลุดจาก Actin!"
            },
            {
                id: "3-3",
                title: "3. แหล่งพลังงานของกล้ามเนื้อ (ลำดับการใช้พลังงาน)",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "เรียงลำดับการสร้าง ATP ในกล้ามเนื้อลาย",
                        content: `
                            <div class="flex flex-col sm:flex-row items-center gap-2 text-xs mt-2">
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center flex-1 w-full text-slate-700">
                                    <span class="font-bold text-amber-700 block">1. Creatine Phosphate</span>
                                    สร้าง ATP ได้เร็วที่สุด (ใช้หมดภายในไม่กี่วินาที)
                                </div>
                                <div class="text-slate-400 font-bold hidden sm:block">&rarr;</div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center flex-1 w-full text-slate-700">
                                    <span class="font-bold text-cyan-700 block">2. Anaerobic Glycolysis</span>
                                    ไม่ใช้ออกซิเจน สลายน้ำตาลเกิด Lactic acid (กล้ามเนื้อเมื่อยล้า)
                                </div>
                                <div class="text-slate-400 font-bold hidden sm:block">&rarr;</div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center flex-1 w-full text-slate-700">
                                    <span class="font-bold text-emerald-700 block">3. Cellular Respiration</span>
                                    ใช้ออกซิเจน สร้าง ATP ได้จำนวนมากที่สุดในระยะยาว
                                </div>
                            </div>
                        `
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "บทที่ 4: การตอบสนองของพืช (Plant Responses)",
        weight: "10 ข้อสอบ A-Level",
        icon: "🌱",
        gradient: "from-cyan-500 to-blue-500",
        badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
        sections: [
            {
                id: "4-1",
                title: "1. สารควบคุมการเจริญเติบโตของพืช (Plant Hormones)",
                hasDiagram: true,
                diagramPath: "assets/images/phototropism.png",
                diagramTitle: "Phototropism & Auxin Redistribution",
                diagramCaption: "กลไก Auxin ลำเลียงไปฝั่งมืด ทำให้เซลล์ยืดตัวหนีแสงและพืชโค้งเข้าหาแสง",
                topics: [
                    {
                        subTitle: "สรุปฮอร์โมนพืช 5 กลุ่มหลัก",
                        content: `
                            <div class="space-y-2.5 sm:space-y-3 text-xs text-slate-700">
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-emerald-700 text-sm">🌱 Auxin (IAA):</b>
                                    <p class="mt-1 text-slate-600">• กระตุ้นการขยายตัวของเซลล์ (<b>Cell Elongation</b>) ทางด้านมืด (หนีแสง)<br>
                                    • ยับยั้งการเจริญของตาข้าง (<b>Apical Dominance</b>)<br>
                                    • <i>วิเคราะห์การทดลอง Went / Boysen-Jensen:</i> แผ่นไมกาใสน้ำผ่านไม่ได้กั้นฝั่งมืดทำให้พืชไม่โค้ง / วุ้น (Agar) ยอมให้ Auxin ซึมผ่านได้</p>
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-amber-700 text-sm">🌾 Gibberellin (GA):</b>
                                    <p class="mt-1 text-slate-600">• กระตุ้นการยืดของข้อปล้อง (Stem elongation) แก้ลักษณะพันธุกรรมแคระ<br>
                                    • กระตุ้นการงอกของเมล็ด (กระตุ้นการสร้างเอนไซม์ <b>&alpha;-amylase</b> สลายแป้งใน Endosperm)</p>
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-cyan-700 text-sm">🍃 Cytokinin:</b>
                                    <p class="mt-1 text-slate-600">• กระตุ้นการแบ่งเซลล์ (Cell division) และชะลอการชราภาพของใบ (Delay senescence)<br>
                                    • ทำงานตรงข้ามกับ Auxin ในเรื่อง Apical dominance (ส่งเสริมการเจริญของตาข้าง)</p>
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-purple-700 text-sm">🏜️ Abscisic Acid (ABA):</b>
                                    <p class="mt-1 text-slate-600">• ฮอร์โมนความเครียด (Stress hormone)<br>
                                    • <b>กระตุ้นการปิดของปากใบ</b> เมื่อขาดน้ำ (K⁺ หลุดออกจาก Guard cell)<br>
                                    • ยับยั้งการงอกของเมล็ด (รักษาการพักตัว - Seed dormancy)</p>
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-rose-700 text-sm">🍌 Ethylene:</b>
                                    <p class="mt-1 text-slate-600">• กระตุ้นการสุกของผลไม้ (Climacteric fruit) และการหลุดร่วงของใบ ดอก ผล (สถานะเป็นแก๊ส)</p>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            {
                id: "4-2",
                title: "2. การเคลื่อนไหวของพืชและการออกดอก (Photoperiodism)",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "การจำแนกทิศทางการเคลื่อนไหว",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-700">
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-cyan-700">Tropism (Tropic movement):</b> ทิศทางสัมพันธ์กับสิ่งเร้า เช่น Phototropism (โค้งหาแสง), Geotropism (ตอบสนองแรงโน้มถ่วง)
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-amber-700">Nastic movement:</b> ทิศทางไม่สัมพันธ์กับสิ่งเร้า เกิดจากแรงดันเต่ง (Turgor pressure) เช่น การหุบของไมยราบเมื่อสัมผัส (Pulvinus cell สูญเสีย K⁺ และน้ำ)
                                </div>
                            </div>
                        `
                    },
                    {
                        subTitle: "กลไก Phytochrome กับการควบคุมการออกดอก",
                        content: `
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2 text-slate-700">
                                <div class="font-bold text-emerald-800 text-center">
                                    P<sub>r</sub> (รับแสง Red, 660 nm) &nbsp;&rightleftharpoons;&nbsp; P<sub>fr</sub> (รับแสง Far-Red, 730 nm - รูปทำงาน Active)
                                </div>
                                <p class="text-slate-600">• <b>พืชวันสั้น (Short-day plant):</b> ออกดอกเมื่อช่วงมืดต่อเนื่อง <b>ยาวนานกว่าค่าวิกฤต</b> (หากฉายแสง Red แทรกกลางดึกจะยับยั้งการออกดอก แต่ถ้าฉาย Far-Red ต่อท้ายจะลบล้างการยับยั้ง)</p>
                                <p class="text-slate-600">• <b>พืชวันยาว (Long-day plant):</b> ออกดอกเมื่อช่วงมืดต่อเนื่อง <b>สั้นกว่าค่าวิกฤต</b></p>
                            </div>
                        `
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "บทที่ 5: พฤติกรรมของสัตว์ (Animal Behavior)",
        weight: "10 ข้อสอบ A-Level",
        icon: "🐾",
        gradient: "from-pink-500 to-rose-500",
        badgeColor: "bg-pink-100 text-pink-800 border-pink-300",
        sections: [
            {
                id: "5-1",
                title: "1. พฤติกรรมที่มีมาแต่กำเนิด (Innate Behavior)",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "ลักษณะสำคัญ & ประเภทของ Innate Behavior",
                        content: `
                            <div class="space-y-2 text-xs text-slate-700">
                                <p>เกิดจากพันธุกรรม ไม่ต้องเรียนรู้ มีแบบแผนแน่นอน (Stereotyped)</p>
                                <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                                    <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                        <b class="text-pink-700 block mb-1">🧭 Orientation (Kinesis vs Taxis)</b>
                                        • <b>Kinesis:</b> เคลื่อนที่ตอบสนองสิ่งเร้าแบบ<b>ไม่มีทิศทางแน่นอน</b> (ความเร็วขึ้นกับความเข้มสิ่งเร้า) เช่น แมลงชอนไชไปในที่ชื้น<br>
                                        • <b>Taxis:</b> เคลื่อนที่เข้าหาหรือหนีสิ่งเร้าแบบ<b>มีทิศทางแน่นอน</b> เช่น แมลงเม่าบินเข้าหาแสง
                                    </div>
                                    <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                        <b class="text-rose-700 block mb-1">⚡ Reflex & Fixed Action Pattern (FAP)</b>
                                        • <b>Reflex:</b> การตอบสนองทันทีทันใดผ่านวงสะท้อนประสาท<br>
                                        • <b>FAP:</b> พฤติกรรมต่อเนื่องที่มีสิ่งเร้าปลดปล่อย (Sign stimulus / Releaser) กระตุ้นให้ทำจนจบแม้สิ่งเร้าจะหายไป
                                    </div>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            {
                id: "5-2",
                title: "2. พฤติกรรมที่เกิดจากการเรียนรู้ (Learned Behavior)",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "สรุปประเภทการเรียนรู้ 5 ระดับ",
                        content: `
                            <div class="space-y-2 text-xs text-slate-700">
                                <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded bg-slate-200 text-pink-800 font-bold shrink-0">Habituation</span>
                                    <span><b>ความเคยชิน:</b> ลดการตอบสนองต่อสิ่งเร้าที่ไม่มีผลดี/ผลเสียเมื่อได้รับซ้ำๆ (เช่น นกกระจอกไม่กลัวหุ่นไล่กา)</span>
                                </div>
                                <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded bg-slate-200 text-rose-800 font-bold shrink-0">Imprinting</span>
                                    <span><b>การฝังใจ:</b> เกิดเฉพาะช่วงเวลาวิกฤต (Critical Period) เท่านั้น และแก้ไขไม่ได้ (เช่น ลูกเป็ดเดินตามแม่)</span>
                                </div>
                                <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded bg-slate-200 text-amber-800 font-bold shrink-0">Classical</span>
                                    <span><b>การเงื่อนไขแบบคลาสสิก (Pavlov):</b> สิ่งเร้าไม่เป็นเงื่อนไข + สิ่งเร้าเงื่อนไข &rarr; เกิดการตอบสนองเงื่อนไข (สุนัขหลั่งน้ำลายเมื่อได้ยินเสียงกระดิ่ง)</span>
                                </div>
                                <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded bg-slate-200 text-cyan-800 font-bold shrink-0">Operant</span>
                                    <span><b>ลองผิดลองถูก (Skinner):</b> เชื่อมโยงพฤติกรรมกับการได้รับรางวัลหรือการลงโทษ (หนูทดลองกดคันสวิตช์เพื่อได้อาหาร)</span>
                                </div>
                                <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2">
                                    <span class="px-2 py-0.5 rounded bg-slate-200 text-emerald-800 font-bold shrink-0">Reasoning</span>
                                    <span><b>การใช้เหตุผล (Insight learning):</b> เรียนรู้ขั้นสูงสุด แก้ปัญหาได้ทันทีโดยไม่ต้องลองผิดลองถูก (พบในสมอง Cerebrum เจริญดี เช่น ไพรเมต มนุษย์)</span>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            {
                id: "5-3",
                title: "3. การสื่อสารระหว่างสัตว์ & ฟีโรโมน (Communication)",
                hasDiagram: false,
                topics: [
                    {
                        subTitle: "การสื่อสารรูปแบบต่างๆ & การเต้นของผึ้ง",
                        content: `
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2 text-slate-700">
                                <b class="text-amber-700">🐝 การเต้นระบำผึ้ง (Waggle Dance):</b>
                                <p class="text-slate-600">• <b>ทิศทาง:</b> มุมที่สั่นท้องทำกับแนวแรงโน้มถ่วง บอกทิศทางของอาหารเทียบกับดวงอาทิตย์<br>
                                • <b>ระยะทาง:</b> ความเร็วในการสั่นท้องบอกระยะทางของแหล่งอาหาร</p>
                            </div>
                        `
                    },
                    {
                        subTitle: "ประเภทของฟีโรโมน (Pheromones)",
                        content: `
                            <div class="grid sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs mt-2 text-slate-700">
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-purple-700">Primer Pheromone:</b> ส่งผลต่อระบบต่อมไร้ท่อและฮอร์โมนในระยะยาว (เช่น ฟีโรโมนนางพญายับยั้งการเจริญของรังไข่ในผึ้งงาน)
                                </div>
                                <div class="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                                    <b class="text-pink-700">Releaser Pheromone:</b> ส่งผลต่อพฤติกรรมทันที (เช่น Sex attractant, Alarm pheromone เตือนภัย, ฟีโรโมนนำทางของมด)
                                </div>
                            </div>
                        `
                    }
                ]
            }
        ]
    }
];

// Flashcards Data for Active Recall Mode
const FLASHCARDS = [
    { chapterId: 1, tag: "Action Potential", q: "Resting state ของเซลล์ประสาทมีค่าศักย์ไฟฟ้าเท่าใด และรักษาไว้อย่างไร?", a: "-70 mV โดยอาศัย Na⁺/K⁺ pump (3Na⁺ ออก, 2K⁺ เข้า) และ Leak channel ของ K⁺", note: "Na+/K+ pump เป็น Active Transport ใช้ ATP" },
    { chapterId: 1, tag: "Depolarization", q: "เมื่อสิ่งเร้ากระตุ้นถึง Threshold (-55 mV) เกิดอะไรขึ้นทางชีววิทยา?", a: "Voltage-gated Na⁺ channel เปิด ทำให้ Na⁺ ทะลักเข้าเซลล์ ศักย์ไฟฟ้าเปลี่ยนเป็น +35 mV", note: "จำง่ายๆ: Depol = Na+ ทะลักเข้า" },
    { chapterId: 1, tag: "Autonomic ANS", q: "ระบบ Sympathetic กับ Parasympathetic ต่างกันอย่างไรเรื่องระยะเส้นประสาทและสารสื่อประสาท?", a: "Sympathetic: Pre-ganglion สั้น, Post-ganglion ยาว (ใช้ Norepinephrine)\nParasympathetic: Pre-ganglion ยาว, Post-ganglion สั้น (ใช้ Acetylcholine)", note: "Sympathetic = Fight or Flight / Parasympathetic = Rest & Digest" },
    { chapterId: 2, tag: "Hormones", q: "ฮอร์โมนกลุ่ม Steroid กับ Peptide ต่างกันอย่างไรในการเข้าจับ Receptor?", a: "Peptide (ละลายน้ำ): จับ Receptor บนเยื่อหุ้มเซลล์\nSteroid (ละลายไขมัน): ผ่านเยื่อหุ้มเซลล์จับ Receptor ภายในเซลล์/นิวเคลียส", note: "Steroid เช่น Sex hormones, Cortisol, Aldosterone" },
    { chapterId: 2, tag: "Posterior Pituitary", q: "ฮอร์โมน ADH และ Oxytocin ถูกสร้างจากที่ใด?", a: "สร้างจาก Hypothalamus แต่ถูกส่งไปเก็บและหลั่งที่ Posterior Pituitary (ต่อมหมวกใต้สมองส่วนหลัง)", note: "ต่อมใต้สมองส่วนหลังไม่ได้สร้างฮอร์โมนเอง!" },
    { chapterId: 2, tag: "Calcium Balance", q: "Calcitonin และ PTH (Parathyroid hormone) ควบคุมแคลเซียมอย่างไร?", a: "Calcitonin (จาก Thyroid): ลด Ca²⁺ ในเลือด (ดึงเข้ากระดูก)\nPTH (จาก Parathyroid): เพิ่ม Ca²⁺ ในเลือด (สลายจากกระดูก, ดูดกลับที่ไต)", note: "จำว่า Calci-TONE = ดึง Ca เข้ากระดูกให้อ่อนลง (ลดในเลือด)" },
    { chapterId: 3, tag: "Locomotion", q: "โครงสร้าง Cilia/Flagellum และ Basal body มีการจัดเรียง Microtubules อย่างไร?", a: "Cilia/Flagellum = 9+2 microtubules (แกน Dynein motor protein)\nBasal body = 9+0 microtubules", note: "ข้อสอบชอบถามตัวเลข 9+2 vs 9+0" },
    { chapterId: 3, tag: "Starfish", q: "เรียงลำดับทางเดินน้ำใน Water Vascular System ของดาวทะเล?", a: "Madreporite → Stone canal → Ring canal → Radial canal → Ampulla → Tube feet", note: "จบที่ Tube feet ในการยึดเกาะและเคลื่อนที่" },
    { chapterId: 3, tag: "Muscle Contraction", q: "ขณะกล้ามเนื้อลายหดตัว แถบใดใน Sarcomere ที่ความยาวไม่เปลี่ยนแปลง?", a: "แถบ A-band ความยาวคงที่เสมอ! ส่วน I-band และ H-zone จะสั้นลงหรือหายไป", note: "กฎเหล็ก: A-band ไม่เคยสั้นลง!" },
    { chapterId: 3, tag: "Rigor Mortis", q: "สภาวะศพเกร็ง (Rigor mortis) เกิดจากสาเหตุใดระดับโมเลกุล?", a: "ขาด ATP ทำให้หัว Myosin ไม่สามารถหลุดออกจาก Actin ได้ กล้ามเนื้อจึงเกร็งค้าง", note: "ATP ต้องเข้าจับ Myosin ถึงจะปล่อย Actin" },
    { chapterId: 4, tag: "Plant Hormones", q: "Auxin (IAA) ส่งผลอย่างไรต่อการเจริญเติบโตเมื่อได้รับแสงด้านเดียว?", a: "Auxin จะลำเลียงหนีแสงไปอยู่ทางด้านมืด กระตุ้นให้เซลล์ฝั่งมืดขยายตัว (Cell elongation) พืชจึงโค้งเข้าหาแสง", note: "เรียกว่า Phototropism" },
    { chapterId: 4, tag: "Seed Germination", q: "ฮอร์โมนใดกระตุ้นการงอกของเมล็ด และกระตุ้นเอนไซม์ชนิดใด?", a: "Gibberellin (GA) กระตุ้นการสร้างเอนไซม์ α-amylase เพื่อสลายแป้งใน Endosperm เป็นน้ำตาล", note: "ABA ทำหน้าที่ตรงข้าม คือรักษาการพักตัว" },
    { chapterId: 4, tag: "Phytochrome", q: "รูปแบบทำงาน (Active form) ของ Phytochrome คือรูปแบบใด และรับแสงความยาวคลื่นเท่าใด?", a: "Pfr (รับแสง Far-Red 730 nm) เป็นรูปทำงาน", note: "Pr รับแสง Red 660 nm แล้วเปลี่ยนเป็น Pfr" },
    { chapterId: 5, tag: "Behavior", q: "Kinesis กับ Taxis ต่างกันอย่างไร?", a: "Kinesis: เคลื่อนที่ไม่มีทิศทางแน่นอน (ความเร็วตามความเข้มสิ่งเร้า)\nTaxis: เคลื่อนที่เข้าหาหรือหนีสิ่งเร้าอย่างมีทิศทางแน่นอน", note: "เช่น แมลงเม่าบินเข้าหาแสง = Taxis" },
    { chapterId: 5, tag: "Waggle Dance", q: "ระบำผึ้ง (Waggle dance) สื่อสารทิศทางและระยะทางอย่างไร?", a: "ทิศทาง: มุมสั่นท้องทำกับแนวแรงโน้มถ่วง (เทียบทิศดวงอาทิตย์)\nระยะทาง: ความเร็วในการสั่นท้อง", note: "เป็น visual/tactile communication ในรังผึ้ง" }
];

// Quiz Questions for Practice Test
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "1. ขณะเกิด Depolarization ในเซลล์ประสาท การเปลี่ยนแปลงของไอออนผ่านเยื่อหุ้มเซลล์เกิดขึ้นอย่างไร?",
        options: [
            "Na⁺ ไหลเข้าเซลล์ผ่าน Voltage-gated Na⁺ channel",
            "K⁺ ไหลออกนอกเซลล์ผ่าน Voltage-gated K⁺ channel",
            "Na⁺ ถูกสูบออกนอกเซลล์ด้วย Na⁺/K⁺ pump 3 โมเลกุล",
            "Ca²⁺ ไหลเข้าเซลล์กระตุ้นการหลั่งสารสื่อประสาท"
        ],
        correct: 0,
        explanation: "ขณะเกิด Depolarization สิ่งเร้ากระตุ้นถึง Threshold (-55 mV) ทำให้ Voltage-gated Na⁺ channel เปิด Na⁺ จึงทะลักเข้าสู่เซลล์จนศักย์ไฟฟ้าพุ่งขึ้นถึง +35 mV"
    },
    {
        id: 2,
        question: "2. ชายคนหนึ่งมีอาการปัสสาวะเจือจางปริมาณมากผิดปกติเนื่องจากขาดฮอร์โมน ADH ข้อใดกล่าวถูกต้องเกี่ยวกับฮอร์โมนนี้?",
        options: [
            "สร้างจากต่อมหมวกใต้สมองส่วนหน้า และยับยั้งการดูดน้ำกลับ",
            "สร้างจาก Hypothalamus แต่ส่งไปเก็บและหลั่งที่ Posterior Pituitary",
            "เป็น Steroid hormone ที่ผ่านเยื่อหุ้มเซลล์ท่อไตได้ทันที",
            "กระตุ้นการหลั่ง Aldosterone ที่ Adrenal cortex"
        ],
        correct: 1,
        explanation: "ADH ถูกสังเคราะห์ที่ตัวเซลล์ประสาทใน Hypothalamus แต่ถูกส่งมาตาม Axon เพื่อเก็บและหลั่งที่ต่อมใต้สมองส่วนหลัง (Posterior Pituitary)"
    },
    {
        id: 3,
        question: "3. ในการหดตัวของกล้ามเนื้อลาย หากเซลล์ขาด ATP จะส่งผลกระทบต่อขั้นตอนใดเป็นอันดับแรก?",
        options: [
            "Ca²⁺ ไม่สามารถจับกับ Troponin ได้",
            "ไม่สามารถปลดปล่อย Ca²⁺ จาก Sarcoplasmic Reticulum ได้",
            "หัว Myosin ไม่สามารถหลุดออกจาก Actin ได้ เกิดสภาวะศพเกร็ง",
            "แถบ A-band จะยืดขยายความยาวออกมากกว่าปกติ"
        ],
        correct: 2,
        explanation: "ATP เป็นสิ่งจำเป็นในการจับกับหัว Myosin เพื่อให้หัว Myosin หลุดออกจาก Actin เมื่อขาด ATP (เช่น หลังเสียชีวิต) หัว Myosin จะเกาะติด Actin ค้างไว้ เกิดสภาวะ ศพเกร็ง (Rigor mortis)"
    },
    {
        id: 4,
        question: "4. เมื่อนำแผ่นไมกา (Mica) มาเสียบกั้นยอดแรกเกิดของพืชทางฝั่งด้านมืด แล้วฉายแสงด้านข้าง พืชจะมีการเจริญอย่างไร?",
        options: [
            "พืชโค้งเข้าหาแสงตามปกติ",
            "พืชตั้งตรง ไม่โค้งเข้าหาแสง",
            "พืชโค้งหนีแสงไปทางด้านมืด",
            "พืชหยุดการเจริญเติบโตและเหี่ยวเฉาทันที"
        ],
        correct: 1,
        explanation: "Auxin จะลำเลียงหนีแสงลงมาทางฝั่งมืด เมื่อมีแผ่นไมกากั้นฝั่งมืด Auxin จึงไม่สามารถซึมผ่านลงมาได้ เซลล์ฝั่งมืดจึงไม่ยืดตัว พืชจึงตั้งตรงไม่โค้งเข้าหาแสง"
    },
    {
        id: 5,
        question: "5. พฤติกรรมใดจัดเป็นพฤติกรรมที่เกิดจากการเรียนรู้แบบ Operant Conditioning (การทดลองลองผิดลองถูก)?",
        options: [
            "นกกระจอกไม่บินหนีหุ่นไล่กาหลังจากเห็นทุกวัน",
            "ลูกเป็ดเพิ่งฟักออกจากไข่เดินตามแม่เป็ด",
            "หนูทดลองกดคันสวิตช์ในกล่องแล้วได้รับอาหาร",
            "สุนัขหลั่งน้ำลายเมื่อได้ยินเสียงกระดิ่งควบคู่กับอาหาร"
        ],
        correct: 2,
        explanation: "Operant Conditioning (Skinner) คือการเชื่อมโยงพฤติกรรมกับการได้รับรางวัลหรือการลงโทษ เช่น หนูบังเอิญกดคันสวิตช์แล้วได้รับอาหาร จึงเรียนรู้ที่จะกดสวิตช์ซ้ำ"
    }
];

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    renderNotesView();
    initFlashcards();
    renderQuizView();
    loadProgress();
    setupSearchEngine();
});

// Render Bento Notes View (Mobile Responsive)
function renderNotesView() {
    const container = document.getElementById("viewNotes");
    container.innerHTML = "";

    const activeChapters = currentChapter === 'all' 
        ? CHAPTERS_DATA 
        : CHAPTERS_DATA.filter(c => c.id === parseInt(currentChapter));

    activeChapters.forEach(ch => {
        const chapterCard = document.createElement("div");
        chapterCard.className = "space-y-4 sm:space-y-6 animate-fade-in";
        chapterCard.id = `chapter-${ch.id}`;

        let sectionsHtml = "";
        ch.sections.forEach(sec => {
            const isCompleted = isSectionCompleted(sec.id);

            // Responsive Full Inline Diagram Card
            let diagramHtml = "";
            if (sec.hasDiagram) {
                diagramHtml = `
                    <div class="mt-3 sm:mt-4 p-3 sm:p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-2">
                        <div class="flex items-center justify-between gap-2">
                            <span class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                <i data-lucide="image" class="w-3.5 h-3.5"></i> สรุป: ${sec.diagramTitle}
                            </span>
                            <button onclick="openImageModal('${sec.diagramPath}', '${sec.diagramTitle}', '${sec.diagramCaption}')" class="text-[11px] sm:text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 underline shrink-0">
                                <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> ดูภาพขยาย
                            </button>
                        </div>
                        <div class="overflow-hidden rounded-xl bg-white p-1.5 sm:p-2 border border-slate-200 shadow-sm cursor-pointer" onclick="openImageModal('${sec.diagramPath}', '${sec.diagramTitle}', '${sec.diagramCaption}')">
                            <img src="${sec.diagramPath}" alt="${sec.diagramTitle}" class="w-full max-h-[360px] sm:max-h-[480px] object-contain mx-auto rounded-lg transition-transform duration-300 hover:scale-[1.01]">
                        </div>
                        <p class="text-[11px] sm:text-xs text-slate-600 text-center font-medium">${sec.diagramCaption}</p>
                    </div>
                `;
            }

            let examTipHtml = "";
            if (sec.examTip) {
                examTipHtml = `
                    <div class="mt-3 sm:mt-4 p-3 sm:p-3.5 rounded-2xl exam-trap-box flex items-start gap-2.5">
                        <span class="text-base sm:text-lg shrink-0">🔥</span>
                        <div class="text-xs">
                            <span class="font-bold text-red-700 block mb-0.5">จุดที่ข้อสอบชอบเอามาลวง! (Exam Trap)</span>
                            <p class="text-slate-800 leading-relaxed font-medium text-[11px] sm:text-xs">${sec.examTip}</p>
                        </div>
                    </div>
                `;
            }

            let topicsHtml = sec.topics.map(t => `
                <div class="space-y-1.5">
                    <h5 class="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> ${t.subTitle}
                    </h5>
                    ${t.content}
                </div>
            `).join("");

            sectionsHtml += `
                <div class="bento-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <div class="flex items-center gap-2.5">
                            <button onclick="toggleSectionProgress('${sec.id}')" class="w-5 h-5 sm:w-6 sm:h-6 rounded-lg border ${isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent'} flex items-center justify-center transition-all shrink-0">
                                <i data-lucide="check" class="w-3.5 h-3.5 sm:w-4 sm:h-4 font-bold"></i>
                            </button>
                            <h4 class="text-xs sm:text-base font-bold text-slate-900 tracking-tight leading-snug">${sec.title}</h4>
                        </div>
                        <span class="text-[10px] sm:text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-200 shrink-0">${isCompleted ? '✓ ทบทวนแล้ว' : 'ยังไม่อ่าน'}</span>
                    </div>

                    <div class="space-y-3 sm:space-y-4">
                        ${topicsHtml}
                    </div>

                    ${diagramHtml}
                    ${examTipHtml}
                </div>
            `;
        });

        chapterCard.innerHTML = `
            <div class="flex items-center justify-between bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
                <div class="flex items-center gap-2.5 sm:gap-3">
                    <span class="text-2xl sm:text-3xl">${ch.icon}</span>
                    <div>
                        <h3 class="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
                            ${ch.title}
                        </h3>
                        <span class="text-[11px] sm:text-xs text-slate-500">สัดส่วนในข้อสอบ: <b class="text-emerald-700">${ch.weight}</b></span>
                    </div>
                </div>
                <span class="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${ch.badgeColor} shrink-0 hidden sm:inline-block">${ch.weight}</span>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:gap-6">
                ${sectionsHtml}
            </div>
        `;

        container.appendChild(chapterCard);
    });

    lucide.createIcons();
}

// Search Engine for both Desktop and Mobile Inputs
function setupSearchEngine() {
    const desktopInput = document.getElementById("searchInput");
    const desktopClear = document.getElementById("clearSearch");
    const mobileInput = document.getElementById("searchInputMobile");
    const mobileClear = document.getElementById("clearSearchMobile");

    const handleSearch = (val, clearBtn) => {
        const query = val.trim().toLowerCase();
        if (query.length > 0) {
            if (clearBtn) clearBtn.classList.remove("hidden");
            performSearch(query);
        } else {
            if (clearBtn) clearBtn.classList.add("hidden");
            renderNotesView();
        }
    };

    if (desktopInput) {
        desktopInput.addEventListener("input", (e) => handleSearch(e.target.value, desktopClear));
    }
    if (mobileInput) {
        mobileInput.addEventListener("input", (e) => handleSearch(e.target.value, mobileClear));
    }

    if (desktopClear) {
        desktopClear.addEventListener("click", () => {
            desktopInput.value = "";
            desktopClear.classList.add("hidden");
            renderNotesView();
        });
    }
    if (mobileClear) {
        mobileClear.addEventListener("click", () => {
            mobileInput.value = "";
            mobileClear.classList.add("hidden");
            renderNotesView();
        });
    }
}

function performSearch(query) {
    if (currentViewMode !== 'notes') {
        toggleViewMode('notes');
    }

    const container = document.getElementById("viewNotes");
    container.innerHTML = "";

    let hasMatch = false;

    CHAPTERS_DATA.forEach(ch => {
        ch.sections.forEach(sec => {
            const fullText = (sec.title + JSON.stringify(sec.topics) + (sec.examTip || "")).toLowerCase();
            if (fullText.includes(query)) {
                hasMatch = true;

                const matchCard = document.createElement("div");
                matchCard.className = "bento-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3 sm:space-y-4 animate-fade-in";
                
                let topicsHtml = sec.topics.map(t => `
                    <div class="space-y-1.5">
                        <h5 class="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${t.subTitle}
                        </h5>
                        ${t.content}
                    </div>
                `).join("");

                matchCard.innerHTML = `
                    <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span class="text-xs font-bold text-emerald-700">${ch.title}</span>
                        <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">ผลค้นหา</span>
                    </div>
                    <h4 class="text-xs sm:text-sm font-bold text-slate-900">${sec.title}</h4>
                    <div class="space-y-3">${topicsHtml}</div>
                `;

                container.appendChild(matchCard);
            }
        });
    });

    if (!hasMatch) {
        container.innerHTML = `
            <div class="text-center py-12 space-y-3">
                <div class="text-4xl">🔍</div>
                <h4 class="text-sm sm:text-base font-bold text-slate-700">ไม่พบคำค้นหาที่ตรงกับ "${query}"</h4>
                <p class="text-xs text-slate-400">ลองค้นหาด้วยคำอื่น เช่น Action Potential, Auxin, Sarcomere, ADH...</p>
            </div>
        `;
    }

    lucide.createIcons();
}

// View Mode Toggle (Sync Desktop & Mobile Navbars)
function toggleViewMode(mode) {
    currentViewMode = mode;

    document.querySelectorAll(".view-content").forEach(el => el.classList.add("hidden"));
    
    // Desktop Nav Buttons
    document.querySelectorAll(".view-tab-btn").forEach(btn => {
        btn.classList.remove("active", "bg-emerald-600", "text-white", "shadow-md");
        btn.classList.add("bg-white", "text-slate-700");
    });

    // Mobile Bottom Nav Buttons
    const mNotes = document.getElementById("mBtnNotes");
    const mCards = document.getElementById("mBtnFlashcards");
    const mQuiz = document.getElementById("mBtnQuiz");

    if (mNotes && mCards && mQuiz) {
        [mNotes, mCards, mQuiz].forEach(b => {
            b.classList.remove("text-emerald-600");
            b.classList.add("text-slate-500");
        });
    }

    if (mode === 'notes') {
        document.getElementById("viewNotes").classList.remove("hidden");
        document.getElementById("btnViewNotes")?.classList.add("active", "bg-emerald-600", "text-white", "shadow-md");
        if (mNotes) {
            mNotes.classList.remove("text-slate-500");
            mNotes.classList.add("text-emerald-600");
        }
    } else if (mode === 'flashcards') {
        document.getElementById("viewFlashcards").classList.remove("hidden");
        document.getElementById("btnViewFlashcards")?.classList.add("active", "bg-emerald-600", "text-white", "shadow-md");
        if (mCards) {
            mCards.classList.remove("text-slate-500");
            mCards.classList.add("text-emerald-600");
        }
    } else if (mode === 'quiz') {
        document.getElementById("viewQuiz").classList.remove("hidden");
        document.getElementById("btnViewQuiz")?.classList.add("active", "bg-emerald-600", "text-white", "shadow-md");
        if (mQuiz) {
            mQuiz.classList.remove("text-slate-500");
            mQuiz.classList.add("text-emerald-600");
        }
    }

    lucide.createIcons();
}

// Chapter Filtering
function filterChapter(chapId) {
    currentChapter = chapId;

    document.querySelectorAll(".chapter-tab-btn").forEach(btn => {
        btn.classList.remove("active", "bg-emerald-600", "text-white", "shadow-sm");
        btn.classList.add("bg-slate-100", "text-slate-700");
    });

    event.currentTarget.classList.add("active", "bg-emerald-600", "text-white", "shadow-sm");
    event.currentTarget.classList.remove("bg-slate-100", "text-slate-700");

    renderNotesView();
}

// Flashcard Engine
function initFlashcards() {
    filteredFlashcards = [...FLASHCARDS];
    activeFlashcardIndex = 0;
    updateFlashcardUI();
}

function filterFlashcards(cat) {
    if (cat === 'all') {
        filteredFlashcards = [...FLASHCARDS];
    } else {
        filteredFlashcards = FLASHCARDS.filter(fc => fc.chapterId === parseInt(cat));
    }
    activeFlashcardIndex = 0;
    updateFlashcardUI();
}

function updateFlashcardUI() {
    if (filteredFlashcards.length === 0) return;

    const cardInner = document.getElementById("flashcard");
    cardInner.classList.remove("flipped");

    const fc = filteredFlashcards[activeFlashcardIndex];
    document.getElementById("fcTag").textContent = fc.tag;
    document.getElementById("fcQuestion").textContent = fc.q;
    document.getElementById("fcAnswer").textContent = fc.a;
    document.getElementById("fcNote").textContent = fc.note ? `📌 ${fc.note}` : '';
    document.getElementById("flashcardCounter").textContent = `${activeFlashcardIndex + 1} / ${filteredFlashcards.length}`;
}

function flipCard() {
    document.getElementById("flashcard").classList.toggle("flipped");
}

function nextFlashcard() {
    if (activeFlashcardIndex < filteredFlashcards.length - 1) {
        activeFlashcardIndex++;
    } else {
        activeFlashcardIndex = 0;
    }
    updateFlashcardUI();
}

function prevFlashcard() {
    if (activeFlashcardIndex > 0) {
        activeFlashcardIndex--;
    } else {
        activeFlashcardIndex = filteredFlashcards.length - 1;
    }
    updateFlashcardUI();
}

// Quiz View Engine
function renderQuizView() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = "";

    const labels = ["A", "B", "C", "D"];

    QUIZ_QUESTIONS.forEach((q, qIndex) => {
        const qCard = document.createElement("div");
        qCard.className = "bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs transition-all";
        qCard.id = `quizCard-${q.id}`;

        let optionsHtml = q.options.map((opt, optIdx) => `
            <label class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/60 cursor-pointer transition-all active:scale-[0.99] group">
                <input type="radio" name="quizOpt_${q.id}" value="${optIdx}" onchange="selectQuizOption(${q.id}, ${optIdx})" class="mt-0.5 w-4 h-4 text-emerald-600 accent-emerald-600 shrink-0">
                <span class="text-xs font-bold text-slate-500 group-hover:text-slate-900 shrink-0">[${labels[optIdx]}]</span>
                <span class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">${opt}</span>
            </label>
        `).join("");

        qCard.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span class="text-xs font-bold text-slate-400">ข้อที่ ${qIndex + 1} / ${QUIZ_QUESTIONS.length}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">A-Level Bio</span>
            </div>
            <h4 class="text-xs sm:text-base font-extrabold text-slate-900 leading-relaxed">${q.question}</h4>
            <div class="grid grid-cols-1 gap-2.5 pt-1">${optionsHtml}</div>
            <div id="quizExplain_${q.id}" class="hidden mt-3 p-3.5 rounded-xl text-xs space-y-1"></div>
        `;

        container.appendChild(qCard);
    });
}

function selectQuizOption(qId, optIdx) {
    userQuizAnswers[qId] = optIdx;
}

function checkQuizAnswers() {
    let score = 0;

    QUIZ_QUESTIONS.forEach(q => {
        const userChoice = userQuizAnswers[q.id];
        const explainBox = document.getElementById(`quizExplain_${q.id}`);
        explainBox.classList.remove("hidden");

        if (userChoice === q.correct) {
            score++;
            explainBox.className = "mt-3 p-3 rounded-2xl text-xs bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium";
            explainBox.innerHTML = `<b>✓ ถูกต้อง!</b><br>${q.explanation}`;
        } else {
            explainBox.className = "mt-3 p-3 rounded-2xl text-xs bg-rose-50 border border-rose-200 text-rose-900 font-medium";
            explainBox.innerHTML = `<b>✕ ยังไม่ถูกต้อง (เฉลยข้อ ${q.correct + 1})</b><br>${q.explanation}`;
        }
    });

    const resultBox = document.getElementById("quizScoreResult");
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `🎉 คุณได้คะแนน: <span class="text-xl sm:text-2xl font-black text-emerald-600">${score} / ${QUIZ_QUESTIONS.length}</span> คะแนน`;
}

// Image Modal Handler
function openImageModal(imgSrc, title, caption) {
    document.getElementById("modalImage").src = imgSrc;
    document.getElementById("modalTitle").innerHTML = `<i data-lucide="image" class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"></i> ${title}`;
    document.getElementById("modalCaption").textContent = caption;
    document.getElementById("imageModal").classList.remove("hidden");
    lucide.createIcons();
}

function closeImageModal() {
    document.getElementById("imageModal").classList.add("hidden");
}

// Progress Tracker with LocalStorage
function isSectionCompleted(secId) {
    const saved = localStorage.getItem("bio_progress");
    if (!saved) return false;
    const array = JSON.parse(saved);
    return array.includes(secId);
}

function toggleSectionProgress(secId) {
    let saved = localStorage.getItem("bio_progress");
    let array = saved ? JSON.parse(saved) : [];

    if (array.includes(secId)) {
        array = array.filter(id => id !== secId);
    } else {
        array.push(secId);
    }

    localStorage.setItem("bio_progress", JSON.stringify(array));
    renderNotesView();
    loadProgress();
}

function loadProgress() {
    const saved = localStorage.getItem("bio_progress");
    const array = saved ? JSON.parse(saved) : [];

    const totalSections = 15;
    const count = array.length;
    const percent = Math.round((count / totalSections) * 100);

    document.getElementById("progressPercent").textContent = `${percent}%`;
    document.getElementById("progressBar").style.width = `${percent}%`;
    document.getElementById("progressText").textContent = `${count} / ${totalSections} หัวข้อย่อย`;
}

function resetProgress() {
    localStorage.removeItem("bio_progress");
    renderNotesView();
    loadProgress();
}

// Scroll Utilities
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener("scroll", () => {
    const btn = document.getElementById("btnBackToTop");
    if (window.scrollY > 250) {
        btn.classList.remove("opacity-0", "pointer-events-none");
    } else {
        btn.classList.add("opacity-0", "pointer-events-none");
    }
});
