import styles from "./page.module.sass"

export const metadata = {
  title: "Dashboard - Fanam Admin",
  // description: "Manage users, orders, payments, and content in Fanam Admin.",
  // keywords: ["admin panel", "dashboard", "Fanam Pay"],
  // openGraph: {
  //   title: "Fanam Admin Dashboard",
  //   description: "Manage everything from a single place",
  //   url: "https://fanampay.com/dashboard",
  //   images: "/og-image.png",
  //   type: "website",
  // },
}

export default function Dashboard() {
  return (
    <>
      <h4 className={styles.header}> Dashboard Page</h4>
    </>
  )
}
