import { IoIosMail } from "react-icons/io";
import "./contact.css";
import { FaMapMarkerAlt, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div>
      {/* banner */}
      <div className="about mx-auto">
        <h1 className="font-bold text-6xl text-white text-center">
          Contact us
        </h1>
      </div>

      {/* body */}
      <div className="mt-12 max-w-6xl max-lg:max-w-3xl mb-12 mx-auto  rounded-lg">
        <div className="grid lg:grid-cols-2 items-center gap-14 sm:p-8 p-4 ">
          <div>
            <h1 className="text-4xl font-bold ">Get in Touch</h1>
            <p className=" text-gray-600 mt-4 leading-relaxed">
            We’re here to assist you whether you have questions or want to explore our services further, don’t hesitate to reach out. Let’s work together to streamline your asset management and achieve your goals efficiently.
            </p>

            <ul className="mt-12 space-y-5 text-xl ">
              <li className="flex items-center font-medium justify-start gap-2">
                <IoIosMail className="text-2xl" />
                <p className="text-base">assetflow2000@gmail.com</p>
              </li>
              <li className="flex items-center font-medium justify-start gap-2">
                <FaPhoneAlt className="text-2xl" />
                <p className="text-base">+88017163489</p>
              </li>
              <li className="flex items-center font-medium justify-start gap-2">
                <FaMapMarkerAlt className="text-2xl" />
                <p className="text-base">Sector - 07, Uttara, Dhaka - 1230</p>
              </li>
            </ul>

            <div className="mb-2 mt-11 text-blueGray-600 flex item-center justify-start ">
              {/* social */}
              <Link
                to="https://www.facebook.com/"
                className="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-black hover:border-[#030C0D] hover:bg-[#030C0D] hover:text-white dark:border-dark-3  dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <svg
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  className="fill-current"
                >
                  <path d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z" />
                </svg>
              </Link>
              <Link
                to="https://x.com/home?lang=en"
                className="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-black hover:border-[#030C0D] hover:bg-[#030C0D] hover:text-white dark:border-dark-3  dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  className="fill-current"
                >
                  <path d="M14.2194 2.06654L15.2 0.939335C15.4839 0.634051 15.5613 0.399217 15.5871 0.2818C14.8129 0.704501 14.0903 0.845401 13.6258 0.845401H13.4452L13.3419 0.751468C12.7226 0.258317 11.9484 0 11.1226 0C9.31613 0 7.89677 1.36204 7.89677 2.93542C7.89677 3.02935 7.89677 3.17025 7.92258 3.26419L8 3.73386L7.45806 3.71037C4.15484 3.61644 1.44516 1.03327 1.00645 0.587084C0.283871 1.76125 0.696774 2.88845 1.13548 3.59296L2.0129 4.90802L0.619355 4.20352C0.645161 5.18982 1.05806 5.96477 1.85806 6.52838L2.55484 6.99804L1.85806 7.25636C2.29677 8.45401 3.27742 8.94716 4 9.13503L4.95484 9.36986L4.05161 9.93346C2.60645 10.8728 0.8 10.8024 0 10.7319C1.62581 11.7652 3.56129 12 4.90323 12C5.90968 12 6.65806 11.9061 6.83871 11.8356C14.0645 10.2857 14.4 4.41487 14.4 3.2407V3.07632L14.5548 2.98239C15.4323 2.23092 15.7935 1.8317 16 1.59687C15.9226 1.62035 15.8194 1.66732 15.7161 1.6908L14.2194 2.06654Z" />
                </svg>
              </Link>
              <Link
                to="https://www.linkedin.com/in/afrida-khan-humashaa/"
                className="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-black hover:border-[#030C0D] hover:bg-[#030C0D] hover:text-white dark:border-dark-3  dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  className="fill-current"
                >
                  <path d="M13.0214 0H1.02084C0.453707 0 0 0.451613 0 1.01613V12.9839C0 13.5258 0.453707 14 1.02084 14H12.976C13.5432 14 13.9969 13.5484 13.9969 12.9839V0.993548C14.0422 0.451613 13.5885 0 13.0214 0ZM4.15142 11.9H2.08705V5.23871H4.15142V11.9ZM3.10789 4.3129C2.42733 4.3129 1.90557 3.77097 1.90557 3.11613C1.90557 2.46129 2.45002 1.91935 3.10789 1.91935C3.76577 1.91935 4.31022 2.46129 4.31022 3.11613C4.31022 3.77097 3.81114 4.3129 3.10789 4.3129ZM11.9779 11.9H9.9135V8.67097C9.9135 7.90323 9.89082 6.8871 8.82461 6.8871C7.73571 6.8871 7.57691 7.74516 7.57691 8.60323V11.9H5.51254V5.23871H7.53154V6.16452H7.55423C7.84914 5.62258 8.50701 5.08065 9.52785 5.08065C11.6376 5.08065 12.0232 6.43548 12.0232 8.2871V11.9H11.9779Z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">

            <form className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-blue-600"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-blue-600"
              />
             
              <textarea
                placeholder="Message"
                rows="6"
                className="w-full rounded-lg px-4 text-gray-800 text-sm pt-3 outline-blue-600"
              ></textarea>
              <button
                type="button"
                className="text-white font-semibold  bg-blue-600 hover:bg-blue-700 tracking-wide rounded-lg  px-4 py-3 flex items-center justify-center w-full !mt-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="#fff"
                  className="mr-2"
                  viewBox="0 0 548.244 548.244"
                >
                  <path
                    fill-rule="evenodd"
                    d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                    clip-rule="evenodd"
                    data-original="#000000"
                  />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
