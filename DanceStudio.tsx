import { useState } from "react";

const NAV_PAGES = [
  { name: "Home", id: "Home" },
  { name: "About Us", id: "AboutUs" },
  { name: "The Company", id: "TheCompany" },
  { name: "Resources", id: "Resources" },
  { name: "Upcoming Events", id: "UpcomingEvents" },
  { name: "Videos", id: "Videos" },
  { name: "Contact", id: "Contact" },
];

const MEMBERS = [
  {
    name: "Philip Ellis Foster",
    title: "Director",
    image:
      "https://static.wixstatic.com/media/c7242a_97f02857e67d4c5094554687728aeb2f~mv2.jpg/v1/crop/x_312,y_837,w_2308,h_2510/fill/w_321,h_344,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ODE-Philip.jpg",
    bio: "Philip Ellis Foster was introduced to dance through Authentic Movement and then discovered Contact Improvisation and The Underscore. Philip developed an interest in performing and has taken many workshops in dance and choreography, participated in several performances, and created choreography for himself and others. Philip also paints, plays and composes music, and writes haiku poems. He is the founder and Director of Open Dance Ensemble.",
  },
  {
    name: "Caroline Alter",
    title: "Dance Maker",
    image:
      "https://static.wixstatic.com/media/78af75_c91000976ab845378ce349b0b5d98de9~mv2.jpeg/v1/fill/w_316,h_474,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image0.jpeg",
    bio: "Caroline Alter (she/they) is a movement artist based in Brooklyn. She is a graduate of Point Park University with a BFA in Dance and co-founder of the school's contemporary dance club. Caroline has attended intensives such as Bates Dance Festival, Hubbard Street Dance Chicago, LINK, David Dorfman Dance, b12 festival and DELVE. She has been a frequent improvisational performer at The Space Upstairs and member of improv-based company, The Pillow Projects, in Pittsburgh, PA. Since moving to NYC in 2022, Caroline has performed at Dixon Place, Triskelion Arts, Mignolo Arts, Koresh Dance and 14th St Y.",
  },
  {
    name: "Nadia Benes",
    title: "Dance Maker",
    image:
      "https://static.wixstatic.com/media/78af75_fab264d95fe64236b3c90a05c3240159~mv2.jpeg/v1/fill/w_322,h_403,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Nadia-1035_Original%20(1).jpeg",
    bio: "Nadia is a classically-educated ballet, contemporary, and modern dancer freelancing and working as a ballet company artist with CityDance NY under Michael Buoni, trained at Jose Limon Dance Company (2022-23) on partial scholarship, and 2 years (2020-22) as a trainee at Sacramento Ballet. Extensive performance experience in ballets like Giselle, including performing alongside Sacramento Ballet's main company in Nutcracker, 2021. Trained in Limon dance under Dante Puleio, Kathryn Alter, and Logan Frances Kruger.",
  },
  {
    name: "Julia Hunkert",
    title: "Dance Maker",
    image:
      "https://static.wixstatic.com/media/78af75_6eaad91be4a6442e8bd9b728580cb698~mv2.jpg/v1/fill/w_414,h_329,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_5859_JPG.jpg",
    bio: "Julia is a German dancer based in NYC. She trained in Musical Theater back in Germany and completed a Certificate in Ballet-Contemporary at Peridance. Her personal focus is on Physical Theater and Improvisational work. She loves connecting with different artists and is excited to learn and grow throughout her professional journey.",
  },
  {
    name: "Olivia Kleven",
    title: "Dance Maker",
    image:
      "https://static.wixstatic.com/media/78af75_632026bfd19847c6a6fcc79ce307daf6~mv2.jpg/v1/fill/w_434,h_288,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Olivia.jpg",
    bio: "Olivia is a freelance dancer based in New York and Seattle, working in contemporary, ballet, and modern styles. Born and raised in Seattle, she attended the Cornish Preparatory Dance School, privately trained with Stephanie Saland, and later danced in a small program led by Deborah Hadley in ballet. She graduated in 2022 with a B.F.A. in contemporary dance from NYU Tisch Dance and went on to get a training certificate with the Limon Trainee program the following year.",
  },
  {
    name: "Erin Raymond",
    title: "Dance Maker",
    image:
      "https://static.wixstatic.com/media/78af75_c34bdb75c11c4d5ab4359cdc02785c68~mv2.jpg/v1/crop/x_47,y_0,w_215,h_213/fill/w_301,h_290,al_c,lg_1,q_80,enc_avif,quality_auto/Raymond%2C%20Erin%20headshot%20.jpg",
    bio: "Erin is a New England-based dancer and arts educator. She holds a BA in Theatre and Dance from Eastern Connecticut State University, where she also studied creative writing and costume design. Since graduating in 2022, Erin currently works as a teaching artist with the Justice Dance Performance Project in Hartford CT, teaching creative movement classes in public elementary schools. She is a full time member of Sonia Plumb Dance Company, and is on staff at several dance studios in Connecticut and New York.",
  },
  {
    name: "Lily Selthofner",
    title: "Dance Maker and Assistant to Director",
    image:
      "https://static.wixstatic.com/media/78af75_65b0dda38da646e38bd5d24e1ec3dcef~mv2.png/v1/fill/w_318,h_476,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202023-11-18%20at%208_20_17%20PM.png",
    bio: "Lily Selthofner is a Senior at Columbia University in NYC studying Dance and Anthropology. As an interdisciplinary artist, Lily works primarily within dance, film, visual arts, and text. At Columbia, Lily has worked and studied with Colleen Thomas-Young, Gabri Christa, Caroline Fermin, Wesley Ensminger, Jenna Riegel, MX Oops, and Ashley Tuttle. In the Spring of 2023, Lily also founded Essence, an improvisational artistic research workshop.",
  },
  {
    name: "John Trunfio",
    title: "Dance Maker",
    image:
      "https://static.wixstatic.com/media/78af75_de755facda814ca3a33823561f2358c9~mv2.jpg/v1/fill/w_318,h_314,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/John%20Trunfio%20Headshot.jpg",
    bio: "John graduated from NYU's Tisch School of the Arts in May of 2020 with a BFA in Dance and minors in East Asian Civilization and History. In June of 2022, he graduated from Drexel University with a MS in Arts Administration and Museum leadership. In addition, he is a certified aerial hoop/lyra instructor. At NYU, he performed works by Wayne McGregor, Sidra Bell, Jim Martin, Ryan Mason, and Emilie Camacho.",
  },
];

const VIDEOS: Record<string, { id: string; title: string; duration: string }[]> = {
  "2024": [
    { id: "JVtdv04Q6QE", title: "Appalachian Summer", duration: "14:31" },
    { id: "ZYSlLYUvjcY", title: "Appalachian Spirit (2024)", duration: "12:12" },
  ],
  "2023": [
    { id: "fu9tMS244Ew", title: "Trio B (2023)", duration: "10:40" },
    { id: "3xTQcKrAFwU", title: "My Name Is Olga (2023)", duration: "04:33" },
    { id: "xZI3-TgmaQQ", title: "Current Events (2023)", duration: "11:44" },
    { id: "0DvF68qlOcY", title: "Gargoyle (2023)", duration: "08:26" },
    { id: "WSCstZk_6Gc", title: "Improv Repeat (2023)", duration: "08:55" },
  ],
  "2022": [
    { id: "-WYEN3hSf18", title: "Strudel (2022)", duration: "05:53" },
    { id: "PfJjVGCnP94", title: "National Water Dances (2022)", duration: "08:41" },
    { id: "AohBbpdxJJQ", title: "HOW DOES IT FEEL? Work-in-Process (2022)", duration: "08:37" },
    { id: "MOcDyPdqbkg", title: "Memory Tones of the Body (2022)", duration: "10:17" },
    { id: "ti6M4iWnq_E", title: "Demonstration (2022)", duration: "08:19" },
    { id: "Kr74ejIr-0Q", title: "Swipe Right (2022)", duration: "06:12" },
  ],
  "2021": [
    { id: "H_0hc43vj0s", title: "Demonstration (2021)", duration: "06:05" },
    { id: "BFp4G02aosM", title: "Process 1 (2021)", duration: "08:09" },
    { id: "PDkJJqqbTsw", title: "Process 2 (2021)", duration: "09:25" },
    { id: "U9-pPA2Njrs", title: "Process 3 (2021)", duration: "09:09" },
    { id: "1_ntklYShgU", title: "Sand & Surf (2021)", duration: "04:43" },
    { id: "FCIiCNqZwV0", title: "When We Connect (2021)", duration: "09:59" },
    { id: "sE2uI4UtW_s", title: "Swipe Right (2021)", duration: "11:18" },
    { id: "jc87QMIZuYo", title: "Extinction (2021)", duration: "14:24" },
  ],
  "2020": [{ id: "PPF8-VsV5R8", title: "Perceptions (2020)", duration: "05:30" }],
  "2019": [
    { id: "2B8DFcDKAiM", title: "The Dancer Body (2019)", duration: "05:43" },
    { id: "9sUVZ4K1Rqk", title: "Repeat/Replace (2019)", duration: "05:49" },
    { id: "4qM_zXrGFdQ", title: "Pina Colada (2019)", duration: "16:10" },
    { id: "PAsUm9i4a-s", title: "Pathways (2019)", duration: "11:45" },
    { id: "jdH4XlGLCGU", title: "Pathways Trio (2019)", duration: "08:56" },
    { id: "09_T5NjBz68", title: "Breaking Open (2019)", duration: "10:46" },
    { id: "K_GRUNtioSY", title: "The Dancer Body (2019)", duration: "08:52" },
  ],
  "2018": [
    { id: "ocgNAXxh0Zc", title: "Let Me Tell You (2018)", duration: "11:21" },
    { id: "neyrp3FNsSc", title: "Pina Colada Part 1 (2018)", duration: "10:37" },
    { id: "-VSVH1yPXdI", title: "Let Me Tell You (WaxWorks, 2018)", duration: "12:22" },
    { id: "V-vPb_u0bXU", title: "June Wind (2018)", duration: "04:58" },
    { id: "JnhzR4kDUp4", title: "Transmission 126 (2018)", duration: "15:28" },
    { id: "ZeO3VKbbLvM", title: "Unity (2018)", duration: "11:10" },
    { id: "DnJBDuXCJRs", title: "Meantime (2018)", duration: "12:29" },
  ],
  "2017": [{ id: "2LZcL5F-V0U", title: "Variation(s) (2017)", duration: "15:14" }],
};

function HomePage() {
  return (
    <div className="relative">
      <div className="relative h-[600px] w-full overflow-hidden">
        <img
          src="https://static.wixstatic.com/media/78af75_340bddff45924b5d845843b7407e53b8~mv2.jpg/v1/fill/w_1920,h_693,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/78af75_340bddff45924b5d845843b7407e53b8~mv2.jpg"
          alt="Open Dance Ensemble team"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-6xl md:text-7xl font-bold text-[#4A90E2] mb-4 drop-shadow-lg">
              Open Dance Ensemble
            </h1>
            <p className="text-3xl md:text-4xl font-light text-white drop-shadow-md">
              &ldquo;Open Dance , Open Mind&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#87CEEB] py-8">
        <div className="flex justify-center items-center space-x-6">
          <a
            href="https://www.facebook.com/Opendanceensemble/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <div className="w-16 h-16 bg-[#3b5998] rounded-lg flex items-center justify-center">
              <svg className="w-10 h-10 text-white fill-white" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
          </a>
          <a
            href="https://www.instagram.com/open.dance.ensemble/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </a>
          <a
            href="https://www.youtube.com/channel/UCUwfHYl7tGNhVqx1RwUr1Vg"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <div className="w-16 h-16 bg-[#FF0000] rounded-lg flex items-center justify-center">
              <svg className="w-10 h-10 text-white fill-white" viewBox="0 0 24 24">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9" fill="red" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      <div className="bg-[#5A8AA8] h-12" />
    </div>
  );
}

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12 text-center">About Us</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6 text-gray-700 leading-relaxed">
          <p>
            Open Dance Ensemble explored, developed and promoted improvised dance strategies and
            offered young dancers the opportunity to create new work. Our seven year history seems
            to fall into three sometimes over-lapping phases.
          </p>
          <p>
            First, we initiated a new technique, one in which dancers conduct each other while
            dancing with a set of gestures and hand signals to bring compositional coherence to the
            individual improvised movements of dancers, and created and presented dozens of new,
            structured improvised performances using this self-conducting technique. A clear although
            later example of this technique is &ldquo;Demonstration&rdquo;, as performed outdoors at Bohemian
            Hall in Queens in September, 2021.
          </p>
          <p>
            Then, in a second phase, we devoted our time and energies to creating new works by
            members of the ensemble, some of which employed self-conducting but all of which were
            based on improvisation. The form and structure of these dances varied considerably as
            each piece was originated by a different member of the ensemble. A good example is
            &ldquo;Swipe Right&rdquo; choreographed by member Sara Pizzi, performed at Green Space Studio in
            Queens in November, 2021.
          </p>
          <p>
            In our third, most recent phase we pay homage to major works from twentieth-century dance
            by resetting them in structured improv formats. Our latest such piece was &ldquo;Appalachian
            Summer&rdquo;, a retake of Martha Graham&apos;s &ldquo;Appalachian Spring&rdquo;, performed at Eden&apos;s
            Expressway in May, 2024.
          </p>
          <p>
            In sum, since 2017 the Open Dance Ensemble has created and presented over forty new
            dances at multiple venues, from abstract pieces to dances with narrative content, each
            with a new or diverse way of dance improvisation.
          </p>
        </div>
      </div>
    </div>
  );
}

function TheCompanyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12 text-center">The Company</h1>
        <div className="space-y-8">
          {MEMBERS.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6">
              <div className="shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                <p className="text-[#4A90E2] font-medium mb-3">{member.title}</p>
                <p className="text-gray-700 leading-relaxed text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-lg text-gray-700 mb-4">
            For a wonderful introduction to dance improvisation see
          </p>
          <a
            href="https://s3-us-west-2.amazonaws.com/movementresearch/performance-journal/What-My-Atoms-Are-Doing.MaryOverlieSylvereLotringerTonyPerucci.MRPJ55.2021.pdf?mtime=20210930161418"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A90E2] hover:underline break-all text-sm"
          >
            What My Atoms Are Doing — Mary Overlie, Sylvere Lotringer, Tony Perucci (MRPJ 2021)
          </a>
        </div>
      </div>
    </div>
  );
}

function UpcomingEventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12 text-center">Upcoming Events</h1>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-xl text-gray-500">
            No upcoming events at this time. Please check back later or follow us on social media for
            updates.
          </p>
        </div>
      </div>
    </div>
  );
}

function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  const years = Object.keys(VIDEOS).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12 text-center">Videos</h1>

        {years.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2">
              {year}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIDEOS[year].map((video) => (
                <div
                  key={video.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setActiveVideo(video)}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#4A90E2] bg-opacity-90 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <p className="text-white text-sm font-medium truncate">{video.title}</p>
                    <p className="text-gray-300 text-xs">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-black rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold truncate">{activeVideo.title}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-gray-400 hover:text-white ml-4 shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12 text-center">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-sm p-12">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 mb-2">Email:</p>
            <a
              href="mailto:opendanceensemble@earthlink.net"
              className="text-2xl text-[#4A90E2] hover:underline"
            >
              opendanceensemble@earthlink.net
            </a>
          </div>
          <div className="border-t pt-12">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Follow us on social media to stay up to date on performances and more:
            </h2>
            <div className="flex justify-center items-center space-x-8">
              <a
                href="https://www.facebook.com/Opendanceensemble/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="w-20 h-20 bg-[#3b5998] rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
              </a>
              <a
                href="https://www.instagram.com/open.dance.ensemble/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
              </a>
              <a
                href="https://www.youtube.com/channel/UCUwfHYl7tGNhVqx1RwUr1Vg"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="w-20 h-20 bg-[#FF0000] rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <polygon points="10 15 15 12 10 9" fill="white" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DanceStudio() {
  const [currentPage, setCurrentPage] = useState("Home");

  function renderPage() {
    switch (currentPage) {
      case "Home": return <HomePage />;
      case "AboutUs": return <AboutUsPage />;
      case "TheCompany": return <TheCompanyPage />;
      case "Resources": return <ResourcesPage />;
      case "UpcomingEvents": return <UpcomingEventsPage />;
      case "Videos": return <VideosPage />;
      case "Contact": return <ContactPage />;
      default: return <HomePage />;
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#87CEEB] border-b border-sky-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 overflow-x-auto">
            <div className="flex items-center space-x-1 md:space-x-6 w-full justify-between">
              {NAV_PAGES.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`text-sm font-bold whitespace-nowrap px-2 py-1 transition-colors ${
                    currentPage === page.id
                      ? "text-[#4A90E2]"
                      : "text-black hover:text-gray-700"
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>{renderPage()}</main>

      <footer className="bg-[#5A8AA8] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white text-sm">
            <button
              onClick={() => setCurrentPage("Home")}
              className="hover:underline"
            >
              top of page
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}
