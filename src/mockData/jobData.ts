import Job from "../model/Job";

export const jobData: Job = {
  id: 1,
  title: "[Remote] Java backend developer",
  benefit: "Overtime",
  createdDate: new Date(),
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Consectetur a erat nam at lectus urna. Ac ut consequat semper viverra. Velit aliquet sagittis id consectetur. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Neque viverra justo nec ultrices dui sapien. Nulla pellentesque dignissim enim sit amet. In hac habitasse platea dictumst. Iaculis nunc sed augue lacus viverra vitae congue eu. Id faucibus nisl tincidunt eget nullam non nisi est. Pellentesque adipiscing commodo elit at imperdiet. Augue ut lectus arcu bibendum at varius. Erat nam at lectus urna duis. Elit sed vulputate mi sit.
  Tincidunt id aliquet risus feugiat in. Eu ultrices vitae auctor eu augue. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Massa placerat duis ultricies lacus sed turpis tincidunt id. Quis imperdiet massa tincidunt nunc pulvinar. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Nisl purus in mollis nunc. Sit amet nisl suscipit adipiscing bibendum. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Vulputate odio ut enim blandit volutpat.`,
  expiredDate: new Date(),
  jobType: {
    id: 1,
    name: "Full-time",
  },
  skill: "Everything",
  updatedDate: new Date(),
};

export const jobList: Array<Job> = [
  jobData,
  {
    id: 2,
    title: "[Remote] NodeJS backend developer asdas",
    benefit: "Overtime",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Consectetur a erat nam at lectus urna. Ac ut consequat semper viverra. Velit aliquet sagittis id consectetur. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Neque viverra justo nec ultrices dui sapien. Nulla pellentesque dignissim enim sit amet. In hac habitasse platea dictumst. Iaculis nunc sed augue lacus viverra vitae congue eu. Id faucibus nisl tincidunt eget nullam non nisi est. Pellentesque adipiscing commodo elit at imperdiet. Augue ut lectus arcu bibendum at varius. Erat nam at lectus urna duis. Elit sed vulputate mi sit.
    Tincidunt id aliquet risus feugiat in. Eu ultrices vitae auctor eu augue. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Massa placerat duis ultricies lacus sed turpis tincidunt id. Quis imperdiet massa tincidunt nunc pulvinar. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Nisl purus in mollis nunc. Sit amet nisl suscipit adipiscing bibendum. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Vulputate odio ut enim blandit volutpat.`,
    jobType: {
      id: 1,
      name: "Full-time",
    },
    skill: "NodeJS, JavaScript, ExperssJS is an advantage",
    createdDate: new Date(),
    updatedDate: new Date(),
    expiredDate: new Date(),
  },
];
