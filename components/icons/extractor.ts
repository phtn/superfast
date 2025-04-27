interface SvgElementProps {
  [key: string]: string | undefined;
}

interface ExtractedSvgElement {
  type: string;
  props: SvgElementProps;
}

interface ExtractedSvgProps {
  elements: ExtractedSvgElement[];
}

/**
 * Extracts all elements and their properties from an SVG string and converts them to React Native compatible format
 * @param svgString - The SVG string to extract properties from
 * @returns An object containing all extracted SVG elements with their props
 */
function extractProps(svgString: string): ExtractedSvgProps {
  const result: ExtractedSvgProps = {
    elements: [],
  };

  // Generic regex to find all SVG elements
  const elementRegex: RegExp = /<(\w+)\s+([^>]+)(?:\/?>)/g;
  let elementMatch: RegExpExecArray | null;

  while ((elementMatch = elementRegex.exec(svgString)) !== null) {
    const [_, elementType, propsStr] = elementMatch;
    const props: SvgElementProps = {};

    // Extract each property
    const propRegex: RegExp = /(\w+(?:-\w+)*)="([^"]*)"/g;
    let propMatch: RegExpExecArray | null;

    while ((propMatch = propRegex.exec(propsStr)) !== null) {
      const [_, key, value] = propMatch;
      // Convert kebab-case to camelCase
      const camelKey: string = key.replace(
        /-([a-z])/g,
        (_: string, letter: string) => letter.toUpperCase(),
      );
      props[camelKey] = value;
    }

    result.elements.push({
      type: elementType,
      props: props,
    });
  }

  return result;
}

/**
 * A mapping of common SVG attributes to their React Native SVG equivalents
 */
const SVG_PROP_MAPPING: Record<string, string> = {
  // Common attribute mappings
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing",
  "text-anchor": "textAnchor",
  "text-decoration": "textDecoration",
};

/**
 * Helper function to transform extracted SVG props into React Native SVG component props
 * @param extractedProps - The extracted SVG properties
 * @returns An object organized by element type for easy use in React Native
 */
function transformToReactNativeSvgProps(
  extractedProps: ExtractedSvgProps,
): Record<string, SvgElementProps[]> {
  const result: Record<string, SvgElementProps[]> = {};

  extractedProps.elements.forEach((element) => {
    if (!result[element.type]) {
      result[element.type] = [];
    }

    // Create a properly mapped props object
    const mappedProps: SvgElementProps = {};

    // Apply the mappings for React Native SVG
    Object.entries(element.props).forEach(([key, value]) => {
      // Check if this property needs a special mapping
      if (key in SVG_PROP_MAPPING) {
        mappedProps[SVG_PROP_MAPPING[key]] = value;
      } else {
        // Apply the default camelCase conversion
        const camelKey = key.replace(/-([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        mappedProps[camelKey] = value;
      }
    });

    result[element.type].push(mappedProps);
  });

  return result;
}

/**
 * Creates React Native SVG component props from an SVG string
 * @param svgString - The SVG string to convert
 * @returns Props ready to use in React Native SVG components
 */
const transformCache = new Map<string, Record<string, SvgElementProps[]>>();

export function toRN(svgString: string): Record<string, SvgElementProps[]> {
  // Check cache first
  const cached = transformCache.get(svgString);
  if (cached) return cached;

  const extractedProps = extractProps(svgString);
  const result = transformToReactNativeSvgProps(extractedProps);

  // Cache the result
  transformCache.set(svgString, result);
  return result;
}

// Example usage
// const svgString: string = `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M16.613 16.085C13.98 17.568 12.477 20.64 12 21.5V8c.415-.746 1.602-2.884 3.632-4.336c.855-.612 1.282-.918 1.825-.64c.543.28.543.896.543 2.127v8.84c0 .666 0 .999-.137 1.232c-.136.234-.508.443-1.25.862"></path><path d="M12 7.806c-.687-.722-2.678-2.436-6.02-3.036c-1.692-.305-2.538-.457-3.26.126C2 5.48 2 6.426 2 8.321v6.809c0 1.732 0 2.598.463 3.139c.462.54 1.48.724 3.518 1.09c1.815.326 3.232.847 4.258 1.37c1.01.514 1.514.771 1.761.771s.752-.257 1.76-.771c1.027-.523 2.444-1.044 4.26-1.37c2.036-.366 3.055-.55 3.517-1.09c.463-.541.463-1.407.463-3.14V8.322c0-1.894 0-2.841-.72-3.425C20.557 4.313 19 4.77 18 5.5"></path></g>`;

// Get props ready for React Native SVG
// const reactNativeProps = svgStringToReactNativeProps(svgString);
// console.log(reactNativeProps);
