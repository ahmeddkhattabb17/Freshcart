import Footer from "@/Components/common/Footer";
import ForgotPasswordPanel from "@/Components/ForgotPasswordPanel";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";

function Services() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <Icon name="truck" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Free Shipping</b>
            <small className="text-xs text-slate-500">
              On orders over 500 EGP
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="return" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Easy Returns</b>
            <small className="text-xs text-slate-500">
              14-day return policy
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="shield" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Secure Payment</b>
            <small className="text-xs text-slate-500">
              100% secure checkout
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="headset" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">24/7 Support</b>
            <small className="text-xs text-slate-500">Contact us anytime</small>
          </span>
        </div>
      </div>
    </section>
  );
}

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <section className="text-center">
            <div className="mx-auto flex h-80 max-w-lg items-center justify-center rounded-2xl bg-emerald-50 shadow-sm">
              <div className="grid h-24 w-24 place-items-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-lg">
                <Icon name="shield" className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mt-7 text-3xl font-extrabold text-slate-800">
              Reset Your Password
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-500">
              Don&apos;t worry, it happens to the best of us. We&apos;ll help
              you get back into your account in no time.
            </p>
            <div className="mt-6 flex justify-center gap-5 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <Icon name="mail" className="h-4 w-4 text-emerald-600" />
                Email Verification
              </span>
              <span className="flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-emerald-600" />
                Secure Reset
              </span>
              <span className="flex items-center gap-2">
                <Icon name="lock" className="h-4 w-4 text-emerald-600" />
                Encrypted
              </span>
            </div>
          </section>
          <ForgotPasswordPanel />
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
