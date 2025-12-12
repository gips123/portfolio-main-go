import PageWrapper from "../../components/transitions/PageWrapper";
import PageHeader from "../../components/ui/PageHeader";
import ContactInfo from "./components/ContactInfo";
import SocialMedia from "./components/SocialMedia";
import { getContactData } from "../../lib/api/contact";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Contact() {
  try {
    const contactData = await getContactData();

    return (
      <PageWrapper>
        <div className="relative min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
          <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20 md:py-24">
            <div className="relative w-full max-w-7xl">
              <PageHeader
                title={contactData.title}
                description={contactData.description}
              />

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr">
                  <ContactInfo contactInfo={contactData.contactInfo} />
                  <SocialMedia socialLinks={contactData.socialLinks} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageWrapper>
    );
  } catch (error) {
    // Let Next.js error boundary handle it
    throw error;
  }
}
