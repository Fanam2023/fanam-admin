"use client"

import {BreadCrumbs, Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {getBankDetails, handleBreadcrump} from "./handler"
import styles from "./page.module.sass"

const BankDetail = () => {
  const bankDetails = getBankDetails()

  return (
    <>
      <section className={`${styles.header} flex flex-sb-center`}>
        <section className={`${styles.leftHeader} flex flex-col`}>
          <BreadCrumbs items={bankDetails.breadcrumbValue} />
          <section className={`bold ${styles.title} flex flex-center`} onClick={handleBreadcrump}>
            <section className={styles.leftArrowContainer}>
              <ImageView wrapperClass={styles.logo} src={assets.ic_back_arrow} alt="Arrow Image" />
            </section>
            Bank Details
          </section>
        </section>
        <section className={`${styles.rightHeader} flex flex-center`}>
          <Button wrapperClass={`medium ${styles.editButton} flex flex-center`}>
            <ImageView wrapperClass={styles.icon} src={assets.ic_edit} alt="Edit" />
            Edit
          </Button>
        </section>
      </section>

      <section className={styles.bank_details_container}>
        {/* Basic Details */}
        <section className={styles.section}>
          <section className={`semi-bold ${styles.sectionheader}`}>Basic Info</section>
          <section className={styles.detailsGrid}>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Bank name</span>
              <span className={`medium ${styles.value}`}>{bankDetails.bankName}</span>
            </section>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Mobile</span>
              <span className={`medium ${styles.value}`}>{bankDetails.mobile}</span>
            </section>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Contact person</span>
              <span className={`medium ${styles.value}`}>{bankDetails.contactPerson}</span>
            </section>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>E-mail</span>
              <span className={`medium ${styles.value}`}>{bankDetails.email}</span>
            </section>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Alternative mobile</span>
              <span className={`medium ${styles.value}`}>{bankDetails.altMobile}</span>
            </section>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Designation</span>
              <span className={`medium ${styles.value}`}>{bankDetails.designation}</span>
            </section>
          </section>
        </section>

        {/* Authentication Details */}
        <section className={styles.section}>
          <section className={styles.sectionheader}>Authentication Details</section>
          <section className={styles.detailsGrid}>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Authentication method</span>
              <span className={`medium ${styles.value}`}>{bankDetails.authMethod}</span>
            </section>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Authorization endpoint</span>
              <span className={`medium ${styles.value}`}>{bankDetails.authEndpoint}</span>
            </section>
            <section className={`${styles.detailItem} flex-col`}>
              <span className={styles.label}>Client secret</span>
              <span className={`medium ${styles.value}`}>{bankDetails.clientSecret}</span>
            </section>
          </section>
        </section>

        {/* White Labelling Details */}
        <section className={styles.section}>
          <section className={styles.sectionheader}>White Labelling Details</section>
          <section className={styles.whiteLabelGrid}>
            <section className={`${styles.fileUpload} flex-col`}>
              <span className={styles.label}>Background Image</span>
              <section className={`${styles.file} flex`}>
                <section className={`${styles.fileLeftHeader}`}>
                  <ImageView wrapperClass={styles.icon} src={assets.ic_docImg} alt="doc" />
                </section>
                <section className={`${styles.fileRightHeader} flex-col`}>
                  <span>{bankDetails.backgroundImage}</span>
                  <small>12 Sep, 2024 at 11:30 • 2.8mb</small>
                </section>
              </section>
            </section>
            <section className={`${styles.fileUpload} flex-col`}>
              <span className={styles.label}>Uploaded Logo</span>
              <section className={`${styles.file} flex`}>
                <section className={`${styles.fileLeftHeader}`}>
                  <ImageView wrapperClass={styles.icon} src={assets.ic_docImg} alt="doc" />
                </section>
                <section className={`${styles.fileRightHeader} flex-col`}>
                  <span>{bankDetails.uploadedLogo}</span>
                  <small>12 Sep, 2024 at 11:30 • 2.8mb</small>
                </section>
              </section>
            </section>
          </section>
          <section className={styles.detailsGrid}>
            <section className={`${styles.colorItem} flex-col`}>
              <span className={styles.colorLabel}>Primary Color</span>
              <section className={`${styles.colorValue} flex`}>
                <section className={styles.colorPreview} style={{backgroundColor: bankDetails.primaryColor}}></section>
                <span className={`medium ${styles.colorCode}`}>{bankDetails.primaryColor}</span>
              </section>
            </section>

            <section className={`${styles.colorItem} flex-col`}>
              <span className={styles.colorLabel}>Secondary Color</span>
              <section className={`${styles.colorValue} flex`}>
                <section
                  className={styles.colorPreview}
                  style={{backgroundColor: bankDetails.secondaryColor}}></section>
                <span className={styles.colorCode}>{bankDetails.secondaryColor}</span>
              </section>
            </section>

            <section className={`${styles.colorItem} flex-col`}>
              <span className={styles.colorLabel}>Accent Color</span>
              <section className={`${styles.colorValue} flex`}>
                <section className={styles.colorPreview} style={{backgroundColor: bankDetails.accentColor}}></section>
                <span className={styles.colorCode}>{bankDetails.accentColor}</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export default BankDetail
