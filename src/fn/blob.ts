export const readAsData = async (file: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    Object.assign(reader, {
      onerror: () => reject(new Error('Failed')),
      onabort: () => reject(new Error('Aborted')),
      onload() {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed'));
        }
      }
    });
    reader.readAsDataURL(file);
  });
};

export const extractURL = async (file: Blob) => {
  try {
    return URL.createObjectURL(file);
  } catch {
    return readAsData(file);
  }
};

export const loadImage = async (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const loader = new Image();

    Object.assign(loader, {
      src,
      crossOrigin: 'Anonymous',
      loading: 'eager',
      importance: 'high',
      decoding: 'async',
      onerror: () => reject(new Error('Failed')),
      onabort: () => reject(new Error('Aborted')),
      onload: () => resolve(loader)
    });
  });
};

export const loadBlob = async (src: string) => {
  return new Promise<Blob>((resolve, reject) => {
    // Need xhr cuz fetch returns invalid blob sometimes (wtf?)
    const xhr = new XMLHttpRequest();

    xhr.open('GET', src, true);

    Object.assign(xhr, {
      responseType: 'blob',
      onerror: () => reject(new Error('Failed')),
      onabort: () => reject(new Error('Aborted')),
      onload() {
        if (xhr.response) {
          resolve(xhr.response);
        } else {
          reject(new Error('Failed'));
        }
      }
    });

    xhr.send();
  });
};

export const extractBlobInfo = (blob: Partial<Blob>) => {
  // eslint-disable-next-line unicorn/explicit-length-check
  const size = blob.size || 0;
  const type = blob.type || 'application/octet-stream';

  const matchExt = /\/(.*?)$/.exec(type);
  const mimeType = (matchExt && matchExt[0]) || '';

  return {
    size,
    type,
    mimeType
  } as const;
};
