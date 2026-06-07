export type ImageItem =
  | File
  | {
      url: string;
      preview?: string;
      name?: string;
      isExisting?: boolean;
    };

