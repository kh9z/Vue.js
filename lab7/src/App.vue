<template>
  <div class="main-bg">
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <EducationSection />
  <ProjectsSection />
  <ContactForm />
  <Footer />
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import EducationSection from './components/EducationSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ContactForm from './components/ContactForm.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    HeroSection,
    AboutSection,
    SkillsSection,
    EducationSection,
    ProjectsSection,
    ContactForm,
    Footer,
  },
};
</script>
<style>
.main-bg{
  background-image: url("https://www.wikihow.com/images_en/0/00/Color-Step-7-6.jpg");
  background-repeat: repeat;
  background-size: 100px 100px;
}
</style>