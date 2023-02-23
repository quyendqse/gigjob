import { Account } from "../model/Account";
import { Shop } from "../model/Shop";

export const account: Account = {
  id: "999",
  created_date: new Date(),
  email: "nabinnovationcenter@gmail.com",
  image_url: "/assets/logo2.png",
  is_disable: false,
  is_locked: false,
  password: "123456789",
  role: 1,
  updated_date: new Date(),
  username: "nab",
};

export const shop: Shop = {
  id: "12345",
  description: `A career at NAB demands a strong work ethic, a sense of humor and an unrelenting ambition to deliver mind blowing work NAB in collaboration with Positive Thinking Company have launched a dedicated technology Centre for NAB in Ho Chi Minh City, Vietnam. This is a state-of-the-art center dedicated to High Tech and Agile Development. Since it is inception in 2019, the NAB Centre in Vietnam strives to create not only a great place to work, but also the best technology center for local tech engineers to thrive. By joining the NAB Vietnam Centre, local software engineers will have a great opportunity to work closely with Australian development team, taking advantage of the latest tools and techniques used by leading global technology companies. NAB is a powerful combination of financial services, coupled with technologies, software engineers, cloud experts and quality engineers. NAB provides a full range of services across personal banking, business banking, private banking, commercial and institution banking. CLOUD FIRST NAB is undergoing an exciting "Cloud First" technology transformation by taking advantage of the latest tools and techniques used by leading technology and digital companies globally. But it’s not just about the Tech, we are also investing heavily in our people, so if you have an appetite to learn, grow and elevate others around you, this is the place for you! IT'S MORE THAN MONEY! We believe in people with ideas and dreams, and we want you to achieve your aspirations. We'll work together to deliver exceptional products and outcomes that push the limits of our own aspirations. Our passion for creating value and exceeding our customers' expectations means we're constantly striving to redefine our standards of excellence. You'll have our backing to develop and our encouragement to explore, realize and reach your full potential. --- About Positive Thinking Company Positive Thinking Company is a global independent tech consultancy group with a team of more than 3,000 talented tech specialists in over 35 cities across Europe, the USA, Asia, Australia, and Africa. Our services draw on a wide array of expertise, including apps & platforms, security, cloud, data & analytics, hyper-automation, and digital workplace. In Vietnam and the APAC region, we specialize in developing mobile, web, and enterprise apps with our Apps & Platforms service and bootstrapping software development centers in Vietnam with our unique B.O.T Model (Build Operate Transfer).`,
  name: "NAB Innovation Center",
  account_id: "999",
  website: "https://nab-vietnam.apac.positivethinking",
  address: [
    {
      location:
        "7th Floor, Etown 5, Cong Hoa Str., Tan Binh Dist., Ho Chi Minh City, Vietnam",
    },
    {
      location:
        "7th Floor, Etown 5, Cong Hoa Str., Tan Binh Dist., Ho Chi Minh City, Vietnam",
    },
    {
      location:
        "7th Floor, Etown 5, Cong Hoa Str., Tan Binh Dist., Ho Chi Minh City, Vietnam",
    },
  ],
};
