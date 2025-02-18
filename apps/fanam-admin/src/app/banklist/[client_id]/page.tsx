"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {useBankDetailsHandler} from "./handler"
import styles from "./page.module.sass"

const BankDetail = () => {
  const {bankDetails, handleBreadcrumb, onUpdate, handleDeleteClick} = useBankDetailsHandler()

  const {
    bank_name,
    mobile,
    contact_person_name,
    email,
    alternative_mobile,
    designation,
    auth_method,
    accent_color,
    font_name,
    font_url,
    primary_color,
    secondary_color,
    background_color,
    logo,
    background_image,
    onboard_client_id,
    onboard_client_secret,
    authorization_url,
  } = bankDetails?.result || {}
  return (
    <>
      <section className={`${styles.header} flex flex-sb-center`}>
        <section className={`${styles.left_header} flex flex-col`}>
          {/* <BreadCrumbs items={bankDetails.breadcrumbValue} /> */}
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
              <span className={`medium ${styles.value}`}>{bank_name}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Mobile</span>
              <span className={`medium ${styles.value}`}>{mobile}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Contact person</span>
              <span className={`medium ${styles.value}`}>{contact_person_name}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>E-mail</span>
              <span className={`medium ${styles.value}`}>{email}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Alternative mobile</span>
              <span className={`medium ${styles.value}`}>{alternative_mobile}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Designation</span>
              <span className={`medium ${styles.value}`}>{designation}</span>
            </section>
          </section>
        </section>

        {/* Authentication Details */}
        <section className={styles.section}>
          <section className={styles.section_header}>Authentication Details</section>
          <section className={styles.details_grid}>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Authentication method</span>
              <span className={`medium ${styles.value}`}>{auth_method}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Authorization endpoint</span>
              <span className={`medium ${styles.value}`}>{authorization_url}</span>
            </section>
            <section className={`${styles.detail_item} flex-col`}>
              <span className={styles.label}>Client secret</span>
              <span className={`medium ${styles.value}`}>{onboard_client_secret}</span>
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
                  <span>{background_image}</span>
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
                  <span>{logo}</span>
                  <small>12 Sep, 2024 at 11:30 • 2.8mb</small>
                </section>
              </section>
            </section>
          </section>
          <section className={styles.details_grid}>
            <section className={`${styles.color_item} flex-col`}>
              <span className={styles.color_label}>Background Color</span>
              <section className={`${styles.color_value} flex`}>
                <section className={styles.color_preview} style={{backgroundColor: background_color}}></section>
                <span className={`medium ${styles.color_code}`}>{background_color}</span>
              </section>
            </section>
            <section className={`${styles.color_item} flex-col`}>
              <span className={styles.color_label}>Primary Color</span>
              <section className={`${styles.color_value} flex`}>
                <section className={styles.color_preview} style={{backgroundColor: primary_color}}></section>
                <span className={`medium ${styles.color_code}`}>{primary_color}</span>
              </section>
            </section>

            <section className={`${styles.color_item} flex-col`}>
              <span className={styles.color_label}>Secondary Color</span>
              <section className={`${styles.color_value} flex`}>
                <section className={styles.color_preview} style={{backgroundColor: secondary_color}}></section>
                <span className={styles.color_code}>{secondary_color}</span>
              </section>
            </section>

            <section className={`${styles.color_item} flex-col`}>
              <span className={styles.color_label}>Accent Color</span>
              <section className={`${styles.color_value} flex`}>
                <section className={styles.color_preview} style={{backgroundColor: accent_color}}></section>
                <span className={styles.color_code}>{accent_color}</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export default BankDetail
