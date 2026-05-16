import { useEffect, useRef } from 'react';

interface InstagramEmbedProps {
  url: string;
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.instgrm) {
      // @ts-ignore
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-8">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: 'calc(100% - 2px)',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={url}
            style={{
              background: '#FFFFFF',
              lineHeight: '0',
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: '50%',
                  flexGrow: 0,
                  height: '40px',
                  marginRight: '14px',
                  width: '40px',
                }}
              ></div>
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                <div
                  style={{
                    backgroundColor: '#F4F4F4',
                    borderRadius: '4px',
                    flexGrow: 0,
                    height: '14px',
                    marginBottom: '6px',
                    width: '100px',
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: '#F4F4F4',
                    borderRadius: '4px',
                    flexGrow: 0,
                    height: '14px',
                    width: '60px',
                  }}
                ></div>
              </div>
            </div>
            <div style={{ padding: '19% 0' }}></div>
            <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 60 60"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                    <g transform="translate(512.000000, 21.000000)">
                      <path
                        d="M30,0 C13.433,0 0,13.433 0,30 C0,46.567 13.433,60 30,60 C46.567,60 60,46.567 60,30 C60,13.433 46.567,0 30,0 Z M30,44.5 C21.992,44.5 15.5,38.008 15.5,30 C15.5,21.992 21.992,15.5 30,15.5 C38.008,15.5 44.5,21.992 44.5,30 C44.5,38.008 38.008,44.5 30,44.5 Z M30,19 C23.925,19 19,23.925 19,30 C19,36.075 23.925,41 30,41 C36.075,41 41,36.075 41,30 C41,23.925 36.075,19 30,19 Z M46.5,16.5 C46.5,18.157 45.157,19.5 43.5,19.5 C41.843,19.5 40.5,18.157 40.5,16.5 C40.5,14.843 41.843,13.5 43.5,13.5 C45.157,13.5 46.5,14.843 46.5,16.5 Z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div style={{ paddingTop: '8px' }}>
              <div
                style={{
                  color: '#3897f0',
                  fontFamily: 'Arial,sans-serif',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 550,
                  lineHeight: '18px',
                }}
              >
                View this post on Instagram
              </div>
            </div>
            <div style={{ padding: '12.5% 0' }}></div>
          </a>
        </div>
      </blockquote>
    </div>
  );
}
