<template>
  <div v-html="svgIcon" class="skill-icon" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    svgIcon() {
      const icons = {
        lang: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M13.9868 5L12.9934 8.70743M11.8432 13L10.0132 19.8297" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
          `,
        empathy: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M2 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M20 12L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 18L6.34305 17.657" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17.6567 6.34326L18 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 18L17.657 17.657" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.34326 6.34326L6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M10.7847 15.3538L10.3157 15.9391L10.7847 15.3538ZM7.25 11.3796C7.25 11.7938 7.58579 12.1296 8 12.1296C8.41421 12.1296 8.75 11.7938 8.75 11.3796H7.25ZM12 9.90096L11.4554 10.4166C11.597 10.5662 11.794 10.651 12 10.651C12.206 10.651 12.403 10.5662 12.5446 10.4166L12 9.90096ZM13.2153 15.3538L13.6843 15.9391L13.2153 15.3538ZM10.2909 14.0016C9.97317 13.7358 9.50016 13.7779 9.23437 14.0956C8.96858 14.4133 9.01065 14.8863 9.32835 15.1521L10.2909 14.0016ZM8.75 11.3796C8.75 10.6647 9.14671 10.0958 9.64107 9.86605C10.0847 9.65992 10.7461 9.66744 11.4554 10.4166L12.5446 9.3853C11.454 8.23345 10.1154 7.99162 9.00898 8.50573C7.95333 8.99626 7.25 10.1171 7.25 11.3796H8.75ZM10.3157 15.9391C10.5164 16.0999 10.7605 16.2953 11.0151 16.4465C11.269 16.5974 11.6065 16.75 12 16.75V15.25C11.9935 15.25 11.931 15.2459 11.7811 15.1569C11.6318 15.0682 11.4683 14.9406 11.2537 14.7686L10.3157 15.9391ZM13.6843 15.9391C14.2286 15.5029 15.0074 14.9422 15.6138 14.248C16.2459 13.5245 16.75 12.5983 16.75 11.3796H15.25C15.25 12.1383 14.9502 12.7276 14.4842 13.2611C13.9925 13.8239 13.379 14.2616 12.7463 14.7686L13.6843 15.9391ZM16.75 11.3796C16.75 10.1171 16.0467 8.99626 14.991 8.50573C13.8846 7.99162 12.546 8.23345 11.4554 9.3853L12.5446 10.4166C13.2539 9.66744 13.9153 9.65992 14.3589 9.86605C14.8533 10.0958 15.25 10.6647 15.25 11.3796H16.75ZM12.7463 14.7686C12.5317 14.9406 12.3682 15.0682 12.2189 15.1569C12.069 15.2459 12.0065 15.25 12 15.25V16.75C12.3935 16.75 12.731 16.5974 12.9849 16.4465C13.2395 16.2953 13.4836 16.0999 13.6843 15.9391L12.7463 14.7686ZM11.2537 14.7686C10.9194 14.5007 10.6163 14.2739 10.2909 14.0016L9.32835 15.1521C9.66331 15.4323 10.0345 15.7138 10.3157 15.9391L11.2537 14.7686Z" fill="currentColor"></path> </g></svg>
          `,
        kill:`
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5"></circle> <path d="M12 10C17 10 16.6 22 9 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12.3115 14C7.31152 14 7.71152 2 15.3115 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M10.6313 10.6961C14.1669 7.16053 22.3693 15.9287 16.9953 21.3027" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"></path> <path d="M13.6802 13.3039C10.1447 16.8395 1.94222 8.07135 7.31623 2.69734" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"></path> <path d="M10.8516 13.5242C7.31605 9.98865 16.0842 1.78622 21.4582 7.16023" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"></path> <path d="M13.4599 10.4758C16.9955 14.0113 8.22736 22.2138 2.85334 16.8398" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"></path> <path d="M10 12.3115C10 7.31152 22 7.71152 22 15.3115" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M14 12C14 17 2 16.6 2 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
          `
      };
      return icons[this.name] || '<!-- missing icon -->';
    }
  }
};
</script>