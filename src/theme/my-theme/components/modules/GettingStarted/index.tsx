import {
  ModuleFields,
  TextField,
  RichTextField,
  ImageField,
} from '@hubspot/cms-components/fields';
import { RichText } from '@hubspot/cms-components';
import logo from '../../../assets/sprocket.svg';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { src, alt, width, height } = fieldValues.logo ?? {};
  const { brandColors } = hublParameters ?? {};

  return (
    <ThemeProvider>
      <div
        className="font-sans flex items-center justify-center text-center flex-col text-white bg-[#2d3e50] min-h-[500px] h-[50vh]"
        style={{
          backgroundColor: brandColors?.color,
          opacity: brandColors?.opacity,
        }}
      >
        <img src={src || logo} alt={alt || 'Logo'} width={width || 100} height={height || 100} />
        <h1>{fieldValues.headline}</h1>
        <RichText fieldPath="gettingStarted" />
        <div className="flex gap-5 items-center justify-center mt-6">
          <a
            href="https://github.com/HubSpot/cms-react/tree/main/examples"
            className="no-underline text-white bg-[#ff7a59] px-5 py-2.5 rounded"
          >
            Examples
          </a>
          <a
            href="https://github.hubspot.com/cms-react/"
            className="no-underline text-white bg-[#ff7a59] px-5 py-2.5 rounded"
          >
            Read the Docs
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
}

const richTextFieldDefaultValue = `
  <div>
    <div>
      <span>
        Deploy to your theme by running <pre>npm run deploy</pre> from the root directory
      </span>
      </div>
  </div>
`;

export const fields = (
  <ModuleFields>
    <ImageField
      name="logo"
      label="Logo"
      default={{ src: logo, height: 100, alt: 'HubSpot logo' }}
      resizable={true}
    />
    <TextField
      name="headline"
      label="Headline"
      default="Getting Started with CMS React"
    />
    <RichTextField
      name="gettingStarted"
      label="Getting Started"
      default={richTextFieldDefaultValue}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Getting Started with CMS React',
};
