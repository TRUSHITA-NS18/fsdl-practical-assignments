export const profileFields = {
  common: [
    { name: "name", label: "Full Name" },
    { name: "phone", label: "Phone Number" },
    { name: "bio", label: "Short Bio" },
    { name: "address", label: "Address (max 100 chars)" }, // ✅ NEW
  ],

  entrepreneur: [
    { name: "startupName", label: "Startup Name" },
    { name: "startupStage", label: "Startup Stage" },
    { name: "industry", label: "Industry" },
  ],

  advisor: [
    { name: "expertise", label: "Expertise" },
    { name: "experience", label: "Years of Experience" },
  ],
};