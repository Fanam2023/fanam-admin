"use client"

import {BreadCrumbs, Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {useBankDetailsHandler} from "./handler"
import styles from "./page.module.sass"

const BankDetail = () => {
  const {getBankDetails, handleBreadcrumb, onUpdate, handleDeleteClick} = useBankDetailsHandler()
  const bankDetails = getBankDetails()

  return (
    <>
      <section className={`${styles.header} flex flex-sb-center`}>
        <section className={`${styles.left_header} flex flex-col`}>
          <BreadCrumbs items={bankDetails.breadcrumbValue} />
          <section className={`bold ${styles.title} flex flex-center`} onClick={handleBreadcrumb}>
            <section className={styles.left_arrow_container}>
              <ImageView wrapperClass={styles.logo} src={assets.ic_back_arrow} alt="Arrow Image" />
            </section>
            Bank Details
          </section>
        </section>
        <section className={`${styles.right_header} flex flex-center`} onClick={onUpdate}>
          <Button wrapperClass={`medium ${styles.edit_button} flex flex-center`}>
            <ImageView wrapperClass={styles.icon} src={assets.ic_edit} alt="Edit" />
            Edit
          </Button>
          <Button wrapperClass={`medium ${styles.delete_button} flex flex-center`} onClick={handleDeleteClick}>
            Delete
          </Button>
        </section>
      </section>

      <section className={styles.bank_details_container}>
        {/* Basic Details */}
        <section className={styles.section}>
          <section className={`semi-bold ${styles.section_header}`}>Basic Info</section>
          <section className={styles.details_grid}>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Bank name</span>
              <span className={`medium ${styles.value}`}>{bankDetails.bankName}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Mobile</span>
              <span className={`medium ${styles.value}`}>{bankDetails.mobile}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Contact person</span>
              <span className={`medium ${styles.value}`}>{bankDetails.contactPerson}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>E-mail</span>
              <span className={`medium ${styles.value}`}>{bankDetails.email}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Alternative mobile</span>
              <span className={`medium ${styles.value}`}>{bankDetails.altMobile}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Designation</span>
              <span className={`medium ${styles.value}`}>{bankDetails.designation}</span>
            </section>
          </section>
        </section>

        {/* Authentication Details */}
        <section className={styles.section}>
          <section className={styles.section_header}>Authentication Details</section>
          <section className={styles.details_grid}>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Authentication method</span>
              <span className={`medium ${styles.value}`}>{bankDetails.authMethod}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Authorization endpoint</span>
              <span className={`medium ${styles.value}`}>{bankDetails.authEndpoint}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Client secret</span>
              <span className={`medium ${styles.value}`}>{bankDetails.clientSecret}</span>
            </section>
          </section>
        </section>

        {/* White Labelling Details */}
        <section className={styles.section}>
          <section className={styles.section_header}>White Labelling Details</section>
          <section className={styles.white_label_grid}>
            <section className={`${styles.file_upload} flex-col`}>
              <span className={styles.label}>Background Image</span>
              <section className={`${styles.file} flex`}>
                <section className={`${styles.file_left_header}`}>
                  <ImageView wrapperClass={styles.icon} src={assets.ic_docImg} alt="doc" />
                </section>
                <section className={`${styles.file_right_header} flex-col`}>
                  <span>{bankDetails.backgroundImage}</span>
                  <small>12 Sep, 2024 at 11:30 • 2.8mb</small>
                </section>
              </section>
            </section>
            <section className={`${styles.file_upload} flex-col`}>
              <span className={styles.label}>Uploaded Logo</span>
              <section className={`${styles.file} flex`}>
                <section className={`${styles.file_left_header}`}>
                  <ImageView wrapperClass={styles.icon} src={assets.ic_docImg} alt="doc" />
                </section>
                <section className={`${styles.file_right_header} flex-col`}>
                  <span>{bankDetails.uploadedLogo}</span>
                  <small>12 Sep, 2024 at 11:30 • 2.8mb</small>
                </section>
              </section>
            </section>
          </section>
          <section className={styles.details_grid}>
            <section className={`${styles.color_item} flex-col`}>
              <span className={styles.color_label}>Primary Color</span>
              <section className={`${styles.color_value} flex`}>
                <section className={styles.color_preview} style={{backgroundColor: bankDetails.primaryColor}}></section>
                <span className={`medium ${styles.color_code}`}>{bankDetails.primaryColor}</span>
              </section>
            </section>

            <section className={`${styles.color_item} flex-col`}>
              <span className={styles.color_label}>Secondary Color</span>
              <section className={`${styles.color_value} flex`}>
                <section
                  className={styles.color_preview}
                  style={{backgroundColor: bankDetails.secondaryColor}}></section>
                <span className={styles.color_code}>{bankDetails.secondaryColor}</span>
              </section>
            </section>

            <section className={`${styles.color_item} flex-col`}>
              <span className={styles.color_label}>Accent Color</span>
              <section className={`${styles.color_value} flex`}>
                <section className={styles.color_preview} style={{backgroundColor: bankDetails.accentColor}}></section>
                <span className={styles.color_code}>{bankDetails.accentColor}</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export default BankDetail
