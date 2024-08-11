import { useState } from 'react';

import useQuery from '../../hooks/useQuery';

import Dialog from '../../components/core/dialog';
import FooterButtons from '../../components/footer-buttons';

import './index.css';

type GetRandomDogImagesResponse = {
  message: string[];
  status: string;
};

type DogImage = {
  isActive: boolean;
  url: string;
};

const Sample2 = () => {
  const [images, setImages] = useState<DogImage[]>([]);

  const { isLoading } = useQuery<GetRandomDogImagesResponse, null>({
    baseUrl: 'https://dog.ceo/api/breeds/image/random/3',
    onSuccess: (data) => {
      const customData = [...data?.message].map((url, index: number) => ({
        isActive: index === 0,
        url,
      }));

      setImages(customData);
    },
  });

  const activeImage = images.find((img) => img.isActive);

  const selectImage = (url: string) => {
    setImages((prevState) =>
      prevState.map((img) => ({ ...img, isActive: img.url === url }))
    );
  };

  return (
    <>
      <p>Example 1:</p>
      <Dialog>
        <Dialog.Trigger>
          <button>Open dog images modal</button>
        </Dialog.Trigger>
        <Dialog.Content modal>
          <Dialog.Header>
            <p>Dog list</p>
          </Dialog.Header>
          {isLoading ? (
            <p>Loading...</p>
          ) : activeImage ? (
            <img className="active-image" src={activeImage.url} alt="active" />
          ) : null}
          <Dialog.Footer>
            <div className="image-list">
              {images.map((img) => (
                <img
                  key={img.url}
                  role="button"
                  onClick={() => selectImage(img.url)}
                  height={100}
                  src={img.url}
                  alt="dog-img"
                />
              ))}
            </div>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      <p className="mt-2">Example 2:</p>
      <Dialog>
        <Dialog.Trigger>
          <button>Open dialog</button>
        </Dialog.Trigger>
        <Dialog.Content modal={false}>
          <Dialog.Header>
            <p>
              <b>Confirm dialog</b>
            </p>
          </Dialog.Header>
          <p>Are you sure you want to do this action?</p>
          <Dialog.Footer>
            <FooterButtons />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default Sample2;
