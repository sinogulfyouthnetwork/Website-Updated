/* SGYN shared team data + bio modal wiring.
   Used by index.html (cards data-i 0-2) and team.html (cards data-i 0-10) — the
   indices map into the same array, so the first three entries must stay the core three.
   Bios are working drafts from confirmed facts; expand when the team writes fuller ones.
   The modal markup (.modal-veil#veil with #bName/#bRole/#bCity/#bBio/#bLink) is static
   in both pages' HTML; this file only fills and opens it.
   Loaded with defer, so it runs after the documents are parsed and after each page's
   inline scripts — the .tcard buttons it wires are in the static markup on both pages. */
var SGYN_TEAM=[
  {name:"Gloria Tsang", role:"Founder & Executive Director", city:"Beijing",
   link:"https://www.linkedin.com/in/g-tsang/",
   bio:"Gloria leads SGYN with 8+ years of experience in global youth advocacy, recognised by organisations including WFUNA and Gulf Intelligence, which named her one of the Top 100 Sustainability Voices in the Middle East. Her professional experience spans fintech at Morgan Stanley in NYC, and various industries across the GCC, Hong Kong, and Southeast Asia. She's currently a Yenching Scholar at Peking University, furthering her research on China-MENA relations, Gulf geopolitics and tech cooperation."},
  {name:"Abdulla AlHemeiri", role:"Deputy Director", city:"United Arab Emirates",
   link:"https://www.linkedin.com/in/abdulla-alhemeiri-b46292215",
   bio:"Abdulla is one of the few Emirati professionals with deep on-the-ground experience on both sides of the China-Gulf relationship. He joined SGYN's leadership team as a Yenching Scholar at Peking University, studying Economics and Management and was the first GCC national admitted to the programme. His research examines China's economic reach into the Gulf through the UAE as a strategic intermediary. He also previously served as a Political Analyst at the UAE Embassy in Beijing."},
  {name:"Huayi Shen", role:"Head of Programs & Partnerships", city:"Saudi Arabia",
   link:"https://www.linkedin.com/in/huayishen/",
   bio:"Huayi designed and leads SGYN's LAB programme and oversees partnerships across China and Saudi Arabia. He holds a degree in Arabic with studies at UIBE, Cairo University, and AUC, and has experience in communications and media through internships at China Media Group and the UIBE Media Center. Based in Saudi Arabia, he works in logistics for a Chinese-Saudi joint venture. He also founded one of RedNote's growing communities for Chinese expats in the Gulf."},
  {name:"Salmeen Binmahfooz", role:"KSA Chief of Staff", city:"Dhahran",
   link:"https://www.linkedin.com/in/salmeen-binmahfooz-84b046219/",
   bio:"Salmeen has been at the centre of SGYN's Saudi operations since the beginning — co-organising the network's first events in the Kingdom and building its entire digital infrastructure from the ground up. He studies Management Information Systems at KFUPM. Outside of SGYN, he's a former Youth Brazilian Jiu-Jitsu World Champion and competes with the Saudi Dodgeball Federation."},
  {name:"Ghalia Badokhon", role:"Jeddah Lead", city:"Jeddah",
   link:"https://www.linkedin.com/in/galiah-badokhon-648659202",
   bio:"Ghalia leads SGYN's on-the-ground presence in Jeddah, driving outreach, event logistics, and community organising in the city. She is currently a Computer Science student at Effat University, with a background in graphic design and social media."},
  {name:"Cindy Li", role:"Shanghai Lead", city:"Shanghai",
   link:"https://www.linkedin.com/in/itscindyli/",
   bio:"Cindy helps run SGYN's presence in its founding city, supporting event organisation and member outreach across Shanghai."},
  {name:"Bowen Gu", role:"NYC Lead", city:"New York",
   link:"https://www.linkedin.com/in/bowengucu/",
   bio:"Bowen handles SGYN's operations in NYC, including the annual Sino-Gulf Youth Dialogue in partnership with the UAE Mission to the United Nations. He is an investment banker based between New York and Shanghai, with prior experience at a PIF-affiliated private equity firm and as the founder of an e-commerce venture in Saudi Arabia. He holds a Master's from Columbia University and a Bachelor's from Central South University. Outside of finance, he's a musician and DJ."},
  {name:"Yasser Mejia", role:"Administrative Lead", city:"",
   link:"https://cn.linkedin.com/in/yasser-mej%C3%ADa-299072420",
   bio:"Yasser is SGYN's Administrative Lead, keeping the network's operations, records, and coordination running behind the scenes."},
  {name:"Rakan Al-Shaibani", role:"SGC Advisory, Consultant", city:"",
   link:"https://www.linkedin.com/in/rakanalshaibani/",
   bio:"Rakan is a consultant with SGC Advisory, supporting the institutional work of the wider Sino-Gulf Collective."},
  {name:"Sahib Rasulov", role:"Events & Dialogue Coordinator", city:"",
   link:"https://cn.linkedin.com/in/sahibrasulov%E9%B2%81%E9%A3%92",
   bio:"Sahib coordinates SGYN's events and dialogues, running the calendar that brings the network together across its cities."},
  {name:"Rahaf Al-Rozah", role:"Literary Salon Coordinator", city:"Jeddah",
   link:"https://www.linkedin.com/in/rahafal-rozah/",
   bio:"Rahaf Al-Rozah served as a Program Lead with the Sino-Gulf Youth Network, where she curated and presented Jeddah's Literary Salon sessions that promoted cross-cultural dialogue. A published writer in both English and Arabic, Rahaf is passionate about literature, research, and fostering meaningful cultural exchange."}
];

(function(){
  var veil=document.getElementById('veil');
  var cards=document.querySelectorAll('.tcard');
  if(!veil||!cards.length)return;

  function openBio(m){
    document.getElementById('bName').textContent=m.name;
    document.getElementById('bRole').textContent=m.role;
    document.getElementById('bCity').textContent=m.city;
    document.getElementById('bBio').textContent=m.bio;
    var lk=document.getElementById('bLink');
    lk.href=m.link; lk.style.display=m.link?'':'none';   /* members without a LinkedIn hide the row */
    veil.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeBio(){veil.classList.remove('open');document.body.style.overflow=''}

  cards.forEach(function(btn){
    btn.addEventListener('click',function(){
      var m=SGYN_TEAM[+btn.dataset.i]; if(m)openBio(m);
    });
  });
  document.getElementById('modalClose').addEventListener('click',closeBio);
  veil.addEventListener('click',function(e){if(e.target===veil)closeBio()});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&veil.classList.contains('open'))closeBio();
  });

  /* exposed so other scripts (and manual checks) can open a bio directly */
  window.SGYN_openBio=openBio;
})();
