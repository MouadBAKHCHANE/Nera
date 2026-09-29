import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** URL d'image Sanity, qui respecte le recadrage et le point focal choisis dans le Studio. */
export const urlFor = (source: SanityImageSource) => builder.image(source);
