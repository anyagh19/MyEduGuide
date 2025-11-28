import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api";
import { Pencil } from "lucide-react";

interface ProfileData {
  full_name?: string;
  dob?: string;
  gender?: string;
  location?: string;
  phone?: string;
  tenth_marks?: number;
  twelfth_marks?: number;
  twelfth_stream?: string;
  has_diploma?: boolean;
  diploma_branch?: string;
  diploma_marks?: number;
  has_degree?: boolean;
  degree_name?: string;
  degree_branch?: string;
  degree_cgpa?: number;
  backlogs?: number;
  technical_skills?: string;
  soft_skills?: string;
  languages_known?: string;
  hobbies?: string;
  interests?: string;
  favorite_subjects?: string;
  personality_traits?: string;
  short_term_goal?: string;
  long_term_goal?: string;
  dream_job?: string;
  study_preference?: string;
  career_path?: string;
  budget?: number;
  about?: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>({});
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<ProfileData>();

  const fetchProfile = async () => {
    try {
      const res = await api.get("api/profile/");
      setProfile(res.data);
      reset(res.data);
    } catch {
      setProfile({});
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const saveSection = async (data: ProfileData) => {
    try {
      await api.put("api/profile/", data);
      setEditingSection(null);
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const SectionHeader = ({ title, name }: { title: string; name: string }) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <button
        type="button"
        onClick={() => {
          setEditingSection(editingSection === name ? null : name);
          reset(profile || {});
        }}
        className="p-2 hover:bg-gray-200 rounded-full transition"
      >
        <Pencil size={20} />
      </button>
    </div>
  );

  return (
    <div className="w-full h-screen px-3 overflow-y-scroll scrollbar-hide bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">MyEduGuide – Profile</h1>

      {/* Utility to render each section */}
      {[
        {
          key: "basic",
          title: "Basic Details",
          fields: [
            { label: "Full Name", name: "full_name", type: "text" },
            { label: "DOB", name: "dob", type: "date" },
            { label: "Gender", name: "gender", type: "select", options: ["male", "female", "other"] },
            { label: "Location", name: "location", type: "text" },
            { label: "Phone", name: "phone", type: "text" },
          ],
        },
        {
          key: "academics",
          title: "Academics",
          fields: [
            { label: "10th Marks", name: "tenth_marks", type: "number" },
            { label: "12th Marks", name: "twelfth_marks", type: "number" },
            {
              label: "12th Stream",
              name: "twelfth_stream",
              type: "select",
              options: ["science", "commerce", "arts"],
            },
            {
              label: "Diploma",
              name: "has_diploma",
              type: "select",
              options: ["false", "true"],
              display: (val: any) => (val ? "Yes" : "No"),
            },
            { label: "Diploma Branch", name: "diploma_branch", type: "text" },
            { label: "Diploma Marks", name: "diploma_marks", type: "number" },
            {
              label: "Degree",
              name: "has_degree",
              type: "select",
              options: ["false", "true"],
              display: (val: any) => (val ? "Yes" : "No"),
            },
            { label: "Degree Name", name: "degree_name", type: "text" },
            { label: "Degree Branch", name: "degree_branch", type: "text" },
            { label: "CGPA", name: "degree_cgpa", type: "number" },
            { label: "Backlogs", name: "backlogs", type: "number" },
          ],
        },
        {
          key: "skills",
          title: "Skills",
          fields: [
            { label: "Technical Skills (CSV)", name: "technical_skills", type: "textarea" },
            { label: "Soft Skills (CSV)", name: "soft_skills", type: "textarea" },
            { label: "Languages Known", name: "languages_known", type: "textarea" },
          ],
        },
        {
          key: "interests",
          title: "Interests & Personality",
          fields: [
            { label: "Hobbies", name: "hobbies", type: "textarea" },
            { label: "Interests", name: "interests", type: "textarea" },
            { label: "Favorite Subjects", name: "favorite_subjects", type: "textarea" },
            { label: "Personality Traits", name: "personality_traits", type: "textarea" },
          ],
        },
        {
          key: "goals",
          title: "Goals",
          fields: [
            { label: "Short Term Goal", name: "short_term_goal", type: "textarea" },
            { label: "Long Term Goal", name: "long_term_goal", type: "textarea" },
            { label: "Dream Job", name: "dream_job", type: "text" },
            {
              label: "Study Preference",
              name: "study_preference",
              type: "select",
              options: ["online", "offline", "both"],
            },
            {
              label: "Career Path",
              name: "career_path",
              type: "select",
              options: ["job", "business", "freelancing", "higher_study", "government"],
            },
          ],
        },
        {
          key: "summary",
          title: "Summary & Budget",
          fields: [
            { label: "Budget (₹)", name: "budget", type: "number" },
            { label: "About Yourself", name: "about", type: "textarea" },
          ],
        },
      ].map((section) => (
        <div key={section.key} className="p-6 bg-white shadow-lg rounded-xl mb-6 hover:shadow-2xl transition">
          <SectionHeader title={section.title} name={section.key} />
          {editingSection === section.key ? (
            <form
              onSubmit={handleSubmit(saveSection)}
              className={`grid gap-4 ${
                section.fields.length > 2 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {section.fields.map((field) =>
                field.type === "textarea" ? (
                  <textarea
                    key={field.name}
                    {...register(field.name as keyof ProfileData)}
                    placeholder={field.label}
                    className="input resize-none"
                  />
                ) : field.type === "select" ? (
                  <select
                    key={field.name}
                    {...register(field.name as keyof ProfileData)}
                    className="input"
                  >
                    <option value="">{field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    key={field.name}
                    {...register(field.name as keyof ProfileData)}
                    type={field.type}
                    placeholder={field.label}
                    className="input"
                  />
                )
              )}
              <button className="save-btn col-span-full">Save</button>
            </form>
          ) : (
            <div className="text-gray-700 space-y-1">
              {section.fields.map((field) => (
                <p key={field.name}>
                  {field.label}:{" "}
                  {field.display
                    ? field.display(profile[field.name as keyof ProfileData])
                    : profile[field.name as keyof ProfileData] || ""}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
