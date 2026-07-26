import { api } from "@/lib/api";

export async function generateCampaign(formData: FormData) {
  try {
    const response = await api.post("/generate", formData);

    console.log("Backend Response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("API Error:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      throw new Error(error.response.data.detail || "Backend error");
    }

    if (error.request) {
      throw new Error(
        "Unable to connect to the backend. Make sure FastAPI is running on port 8000."
      );
    }

    throw error;
  }
}