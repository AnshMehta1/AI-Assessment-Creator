import multer from "multer"

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, "uploads/")
    },

    filename: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        `${Date.now()}-${file.originalname}`
      )
    },
  })

export const upload =
  multer({
    storage,

    limits: {
      fileSize:
        10 * 1024 * 1024,
    },

    fileFilter: (
      req,
      file,
      cb
    ) => {
      const allowedTypes = [
        "application/pdf",
        "text/plain",
      ]

      if (
        allowedTypes.includes(
          file.mimetype
        )
      ) {
        cb(null, true)
      } else {
        cb(
          new Error(
            "Only PDF and TXT files allowed"
          )
        )
      }
    },
  })