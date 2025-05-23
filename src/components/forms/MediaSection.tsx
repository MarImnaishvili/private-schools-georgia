/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/MediaSection.tsx
import { MediaItem, mediaSectionProps } from "@/types/formData";
import { useTranslations } from "next-intl";

export default function MediaSection({ media, onChange }: mediaSectionProps) {
  const tMedia = useTranslations("media");
  const handleChange = (index: number, field: keyof MediaItem, value: any) => {
    const newMedia = [...media];
    (newMedia[index][field] as any) = value; // 👈 suppress type error
    onChange(newMedia);
  };

  const addMediaItem = () => {
    onChange([...media, { mediaUrl: "", type: "photo", attachedTo: "school" }]);
  };

  const removeMediaItem = (index: number) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    onChange(newMedia);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl mt-6 font-semibold">{tMedia("Media")}</h2>
      {media.map((item, index) => (
        <div key={index} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder={tMedia("Media URL")}
            value={item.mediaUrl}
            onChange={(e) => handleChange(index, "mediaUrl", e.target.value)}
            className="w-full border px-2 py-1"
          />
          <select
            value={item.type}
            onChange={(e) => handleChange(index, "type", e.target.value)}
            className="w-full border px-2 py-1"
          >
            <option value="photo">{tMedia("Photo")}</option>
            <option value="video">{tMedia("Video")}</option>
          </select>
          <input
            type="text"
            placeholder={tMedia("Description (optional)")}
            value={item.description || ""}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full border px-2 py-1"
          />
          <select
            value={item.attachedTo}
            onChange={(e) => handleChange(index, "attachedTo", e.target.value)}
            className="w-full border px-2 py-1"
          >
            <option value="school">{tMedia("School")}</option>
            <option value="primary">{tMedia("primary")}</option>
            <option value="basic">{tMedia("Basic")}</option>
            <option value="secondary">{tMedia("Secondary")}</option>
          </select>
          <button
            type="button"
            className="text-red-500"
            onClick={() => removeMediaItem(index)}
          >
            {tMedia("Remove")}
          </button>
        </div>
      ))}
      <button type="button" className="text-blue-600" onClick={addMediaItem}>
        + {tMedia("Add Media")}
      </button>
    </div>
  );
}
