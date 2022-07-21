import React from "react";
function CamerCards({ data }) {
  return (
    <div className="main-container ">
      <div className="bg-white mx-1 pt-9 px-7 pb-7 rounded-sm">
        <ul
          role="list"
          className="grid sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 "
        >
          {data.map((file) => (
            <li key={file.source} className="relative shadow-lg p-2">
              <div className="group block w-full aspect-w-10 aspect-h-7    overflow-hidden">
                <div class="video video-4">
                  <iframe
                    width="260"
                    height="215"
                    title="title"
                    src="https://www.youtube.com/embed/XDrB5c4-c9Y"
                    frameborder="0"
                    allowfullscreen
                  />
                </div>
              </div>
              <div className="px-2 pt-2 pb-8">
                <h2 className="text-gray-900 text-base"> {file.title}</h2>
                <p className="mt-2 block text-sm font-medium text-primary truncate pointer-events-none">
                  {file.subtitle}
                </p>
                <p className="block text-xs mt-2  font-medium text-primary pointer-events-none">
                  {file.info}
                </p>
                <div className="mt-6">
                  <a
                    href={file.url}
                    className="hover:text-white hover:bg-primary text-sm transition-all ease-in-out duration-300 bg-white text-primary border-2 border-primary px-4 py-2 rounded-3xl"
                  >
                    
                    View More
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CamerCards;
/* const files = [
  {
    id: 1,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 2,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 3,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 4,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 5,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 6,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 7,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
  {
    id: 8,
    title: "Camera Name 1 Canon G7X |||",
    subtitle: "236 videos || 120 Snapshots || 12 Analysis jobs",
    info: "Add Dtae 2020",
    url: "path",
    source: "https://www.youtube.com/watch?v=ixVaAQVEiSM",
  },
];
 */