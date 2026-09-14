import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Loader2, Mail, MapPin, MapPinned, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type ProfileData = {
  fullname: string
  email: string
  address: string
  city: string
  country: string
  profilePicture: string
}

const defaultProfile: ProfileData = {
  fullname: "",
  email: "",
  address: "",
  city: "",
  country: "",
  profilePicture: "",
}

const profileStorageKey = "cravecart-profile"

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem(profileStorageKey)
    if (!savedProfile) return

    try {
      setProfileData({ ...defaultProfile, ...JSON.parse(savedProfile) })
    } catch {
      localStorage.removeItem(profileStorageKey)
    }
  }, [])

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProfileData((currentProfile) => ({ ...currentProfile, [name]: value }))
    setMessage("")
    setError("")
  }

  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your profile picture must be smaller than 5 MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setProfileData((currentProfile) => ({
        ...currentProfile,
        profilePicture: String(reader.result),
      }))
      setMessage("")
      setError("")
    }
    reader.onerror = () => setError("We could not read that image. Please try another one.")
    reader.readAsDataURL(file)
    event.target.value = ""
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage("")
    setError("")

    localStorage.setItem(profileStorageKey, JSON.stringify(profileData))
    window.setTimeout(() => {
      setIsLoading(false)
      setMessage("Your profile has been saved.")
    }, 300)
  }

  return (
    <form onSubmit={submitHandler} className="mx-auto my-6 w-full max-w-5xl px-4 sm:px-6 lg:my-10">
      <div className="border-b border-border pb-6">
        <p className="text-sm font-medium text-muted-foreground">Account</p>
        <div className="mt-1 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Profile settings
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Keep your personal details up to date for a smoother CraveCart experience.
            </p>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-button text-white hover:bg-button-hover sm:w-auto">
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Saving..." : "Update profile"}
          </Button>
        </div>
      </div>

      <section className="border-b border-border py-8" aria-labelledby="profile-picture-heading">
        <div>
          <h2 id="profile-picture-heading" className="text-base font-semibold">
            Profile picture
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a photo that helps people recognize you.
          </p>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="relative">
            <Avatar className="size-24 ring-4 ring-muted sm:size-28">
              <AvatarImage src={profileData.profilePicture} alt="Profile" />
              <AvatarFallback className="bg-button/15 text-lg font-semibold text-button">
                CN
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              size="icon"
              aria-label="Add profile picture"
              className="absolute -right-1 -bottom-1 size-9 rounded-full bg-button text-white shadow-sm hover:bg-button-hover"
            >
              <Plus />
            </Button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={fileChangeHandler}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-sm font-medium">Add a profile photo</p>
            <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or WEBP up to 5 MB</p>
          </div>
        </div>
      </section>

      <section className="py-8" aria-labelledby="personal-details-heading">
        <div>
          <h2 id="personal-details-heading" className="text-base font-semibold">
            Personal details
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This information is used to personalize your orders and deliveries.
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full name</Label>
            <Input id="fullname" name="fullname" value={profileData.fullname} onChange={changeHandler} placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" name="email" type="email" value={profileData.email} onChange={changeHandler} placeholder="you@example.com" className="pl-9" />
            </div>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Delivery address</Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="address" name="address" value={profileData.address} onChange={changeHandler} placeholder="Street address" className="pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <div className="relative">
              <MapPinned className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="city" name="city" value={profileData.city} onChange={changeHandler} placeholder="Enter your city" className="pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" value={profileData.country} onChange={changeHandler} placeholder="Enter your country" />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-end">
          <div role="status" className="text-sm text-muted-foreground sm:mr-auto">
            {error || message}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-button text-white hover:bg-button-hover sm:w-auto">
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </section>
    </form>
  )
}

export default Profile
