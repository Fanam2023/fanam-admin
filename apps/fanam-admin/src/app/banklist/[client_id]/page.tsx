"use client"

import {Button, ImageView, useDialog} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import assets from "assets"
import {ROUTE_BANK} from "utils"
import {useBankDetailsHandler} from "./handler"
import styles from "./page.module.sass"

const BankDetail = () => {
  const {id, bankDetails, handleBreadcrumb, onUpdate, onBankDelete} = useBankDetailsHandler()
  const {toggleDialog} = useDialog()
  const {push} = useRouter()

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
    sso_url,
  } = bankDetails?.result || {}

  const onDeleteBank = () => {
    toggleDialog({
      primaryButtonText: "Delete",
      secondaryButtonText: "Cancel",
      message: "Are you sure you want to delete this bank account?",
      onClickPrimary: () => {
        onBankDelete(id)
        toggleDialog()
        push(ROUTE_BANK)
      },
      onClickSecondary: () => toggleDialog(),
    })
  }

  return (
    <>
      <section className={`${styles.header} flex flex-sb-center`}>
        <section className={`bold ${styles.title} flex flex-center`} onClick={handleBreadcrumb}>
          <section className={styles.left_arrow_container}>
            <ImageView wrapperClass={styles.logo} src={assets.ic_back_arrow} alt="Arrow Image" />
          </section>
          Bank Details/{id}
        </section>
        <section className={`${styles.right_header} flex flex-center`}>
          <Button wrapperClass={`medium ${styles.edit_button} flex flex-center`} onClick={onUpdate}>
            <ImageView wrapperClass={styles.icon} src={assets.ic_edit} alt="Edit" />
            Edit
          </Button>
          <Button wrapperClass={`medium ${styles.delete_button} flex flex-center`} onClick={onDeleteBank}>
            <ImageView src={assets.ic_delete} alt="delete" imgSize={16} wrapperClass={styles.delete_icon} />
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
            {auth_method === "Saml" ? (
              <section className={`${styles.detail_item} flex-col`}>
                <span className={styles.label}>SsO url</span>
                <span className={`medium ${styles.value}`}>{sso_url}</span>
              </section>
            ) : (
              <>
                <section className={`${styles.detail_item} flex-col`}>
                  <span className={styles.label}>Authorization endpoint</span>
                  <span className={`medium ${styles.value}`}>{authorization_url}</span>
                </section>
                <section className={`${styles.detail_item} flex-col`}>
                  <span className={styles.label}>Client secret</span>
                  <span className={`medium ${styles.value}`}>{onboard_client_secret}</span>
                </section>
              </>
            )}
          </section>
        </section>

        {/* White Labelling Details */}
        <section className={styles.section}>
          <section className={styles.section_header}>White Labelling Details</section>
          <section className={styles.white_label_grid}>
            <section className={`${styles.file_upload} flex-col`}>
              <span className={styles.label}>Background Image</span>
              <ImageView wrapperClass={styles.icon} src={background_image?.url} alt="doc" />
            </section>
            <section className={`${styles.file_upload} flex-col`}>
              <span className={styles.label}>Uploaded Logo</span>
              <section className={`${styles.file} flex`}>
                <ImageView wrapperClass={styles.icon} src={logo?.url} alt="doc" />
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
