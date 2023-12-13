import million from 'million/compiler';


const millionConfig = {
    // if you're using RSC:
    auto: { rsc: true },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages:["mongoose"],
    },
}

export default million.next(nextConfig, millionConfig);
